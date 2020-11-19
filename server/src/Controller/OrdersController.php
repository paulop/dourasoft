<?php


namespace App\Controller;


class OrdersController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->loadModel("Clients");
        $this->loadModel("Products");
        $this->RequestHandler->respondAs('json');
    }

    public function index()
    {
        $orders = $this->Orders
            ->find("all", ["order" => ["created_at" => "DESC"]])
            ->contain(['Clients']);
        return $this->response->withStringBody(json_encode($orders));
    }

    public function view($id)
    {
        $order = $this->Orders
            ->findById($id)
            ->contain(['Clients', 'OrderProducts' => ["sort" => ["OrderProducts.id" => "ASC"]], 'OrderProducts.Products'])
            ->first();
        if (empty($order))
            return $this->response->withStringBody("{\"message\":\"Order Not Found\"}")->withStatus(404);

        return $this->response->withStringBody(json_encode($order));
    }

    public function add()
    {
        $this->request->allowMethod(['post']);

        $body = $this->request->getParsedBody();
        $validation = $this->validateCreateBody($body);
        if ($validation["isInvalid"])
            return $this->response->withStringBody(json_encode(["invalids" => $validation["invalids"]]))->withStatus($validation["status"]);

        $order = $this->Orders->newEntity($validation["body"]);
        if ($this->Orders->save($order)) {
            $order->clean();
            $order["client"] = $validation["body"]["client"];
            return $this->response->withStringBody(json_encode($order))->withStatus(201);
        }
        return $this->response->withStringBody("\"message\":\"Error on Create\"")->withStatus(500);
    }

    public function edit($id)
    {
        $this->request->allowMethod(['patch']);

        $order = $this->Orders->findById($id)->first();
        if (empty($order))
            return $this->response->withStringBody("{\"message\":\"Order Not Found\"}")->withStatus(404);

        $body = $this->request->getParsedBody();
        $validation = $this->validateUpdateBody($body);
        if ($validation["isInvalid"])
            return $this->response->withStringBody(json_encode(["invalids" => $validation["invalids"]]))->withStatus($validation["status"]);

        $order = $this->Orders->patchEntity($order, $validation["body"]);
        if ($this->Orders->save($order))
            return $this->response->withStringBody(json_encode($order));
        return $this->response->withStringBody("\"message\":\"Error on Update\"")->withStatus(500);

    }

    public function delete($id)
    {
        $this->request->allowMethod(['delete']);

        $order = $this->Orders->findById($id)->first();
        if (empty($order))
            return $this->response->withStringBody("{\"message\":\"Order Not Found\"}")->withStatus(404);
        elseif ($this->Orders->delete($order))
            return $this->response->withStringBody("{\"message\":\"Order Deleted\"}");
        else
            return $this->response->withStringBody("{\"message\":\"Error on Delete\"}")->withStatus(500);
    }

    public function validateUpdateBody($body)
    {
        $invalids = [];
        $patch = [];
        $status = 200;
        if (array_key_exists("client_id", $body)) {
            if (trim($body["client_id"])) {
                $client = $this->Clients->findById($body["client_id"])->first();
                if (empty($client)) {
                    $invalids["client"] = "Client Not Found";
                    $status = 404;
                } else {
                    $patch["client_id"] = $body["client_id"];
                    $patch["client"] = $client;
                }
            } else
                $invalids["client"] = "Empty";
        }
        if (array_key_exists("status", $body)) {
            if (in_array($body["status"], ["Aberto", "Entregue", "Cancelado"]))
                $patch["status"] = $body["status"];
            else
                $invalids["status"] = "Status not Know";
        }
        if (array_key_exists("products", $body)) {
            $productsValidation = $this->validateProducts($body["products"]);
            if ($productsValidation["isInvalid"]) {
                $invalids["products"] = $productsValidation["invalids"];
                $status = $productsValidation["status"];
            } else
                $patch["products"] = $productsValidation["body"];
        }
        if ($invalids)
            return ["isInvalid" => true, "invalids" => $invalids, "status" => $status == 404 ? 404 : 400];
        return ["isInvalid" => false, "body" => $patch, "status" => 200];
    }

    public function validateProducts($orderProducts)
    {
        $invalids = [];
        $patch = [];
        $status = 400;
        foreach ($orderProducts as $orderProduct) {
            $invalid = [];
            if (!array_key_exists("product_id", $orderProduct))
                return ["isInvalid" => true, "invalids" => "product_id is required", "status" => 400];

            $productId = $orderProduct["product_id"];
            $product = $this->Products->findById($productId)->first();
            if (empty($product)) {
                $invalid["id"] = "Not Found";
                $status = 404;
            }
            $unitValue = $product["price"];
            $quantity = 1;
            if (array_key_exists("unit_value", $orderProduct)) {
                if ($orderProduct["unit_value"] >= 0)
                    $unitValue = $orderProduct["unit_value"];
                else
                    $invalid["unit_value"] = "Invalid Value";
            }
            if (array_key_exists("quantity", $orderProduct)) {
                if ($orderProduct["quantity"] >= 0)
                    $quantity = $orderProduct["quantity"];
                else
                    $invalid["quantity"] = "Invalid Value";
            }
            if ($invalid)
                $invalids[$productId] = $invalid;
            else
                $patch[] = ["product_id" => $productId, "unit_value" => $unitValue, "quantity" => $quantity];
        }
        if ($invalids)
            return ["isInvalid" => true, "invalids" => $invalids, "status" => $status];
        return ["isInvalid" => false, "body" => $patch, "status" => 200];
    }

    public function validateCreateBody($body)
    {
        $invalids = [];
        $status = 400;
        if (!array_key_exists("client_id", $body))
            $invalids["client_id"] = "Required";
        if (!array_key_exists("products", $body))
            $invalids["products"] = "Required";
        $partialValidation = $this->validateUpdateBody($body);

        if ($invalids) {
            if ($partialValidation["isInvalid"]) {
                $invalids = array_merge($invalids, $partialValidation["invalids"]);
                $status = $status == 400 ? $partialValidation["status"] : 404;
            }
            return ["isInvalid" => true, "invalids" => $invalids, "status" => $status];
        }
        return $partialValidation;
    }

}
