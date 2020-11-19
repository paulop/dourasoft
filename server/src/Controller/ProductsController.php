<?php


namespace App\Controller;

class ProductsController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->RequestHandler->respondAs('json');
    }

    public function index()
    {
        $products = $this->Products->find("all", ["order" => ["id" => "DESC"]]);
        return $this->response->withStringBody(json_encode($products));
    }

    public function view($id)
    {
        $product = $this->Products->findById($id)->first();
        if (empty($product))
            return $this->response->withStringBody("{\"message\":\"Product Not Found\"}")->withStatus(404);

        return $this->response->withStringBody(json_encode($product));
    }

    public function add()
    {
        $this->request->allowMethod(['post']);

        $body = $this->request->getParsedBody();
        $validation = $this->validateCreateBody($body);
        if ($validation["isInvalid"])
            return $this->response->withStringBody(json_encode(["invalids" => $validation["invalids"]]))->withStatus(400);

        $product = $this->Products->newEntity($validation["body"]);
        if ($this->Products->save($product))
            return $this->response->withStringBody(json_encode($product))->withStatus(201);
        return $this->response->withStringBody("\"message\":\"Error on Create\"")->withStatus(500);
    }

    public function edit($id)
    {
        $this->request->allowMethod(['patch']);

        $product = $this->Products->findById($id)->first();
        if (empty($product))
            return $this->response->withStringBody("{\"message\":\"Product Not Found\"}")->withStatus(404);

        $body = $this->request->getParsedBody();
        $validation = $this->validateUpdateBody($body);
        if ($validation["isInvalid"])
            return $this->response->withStringBody(json_encode(["invalids" => $validation["invalids"]]))->withStatus(400);

        $product = $this->Products->patchEntity($product, $validation["body"]);
        if ($this->Products->save($product))
            return $this->response->withStringBody(json_encode($product));
        return $this->response->withStringBody("\"message\":\"Error on Update\"")->withStatus(500);
    }

    public function delete($id)
    {
        $this->request->allowMethod(['delete']);

        $product = $this->Products->findById($id)->first();
        if (empty($product))
            return $this->response->withStringBody("{\"message\":\"Product Not Found\"}")->withStatus(404);
        elseif ($this->Products->delete($product))
            return $this->response->withStringBody("{\"message\":\"Product Deleted\"}");
        else
            return $this->response->withStringBody("{\"message\":\"Error on Delete\"}")->withStatus(500);
    }

    public function validateUpdateBody($body)
    {
        $invalids = [];
        $patch = [];
        if (array_key_exists("name", $body)) {
            if (trim($body["name"]))
                $patch["name"] = $body["name"];
            else
                $invalids["name"] = "Empty";
        }
        if (array_key_exists("code", $body)) {
            if (trim($body["code"]))
                $patch["code"] = $body["code"];
            else
                $invalids["code"] = "Empty";
        }
        if (array_key_exists("price", $body)) {
            if ($body["price"] >= 0)
                $patch["price"] = $body["price"];
            else
                $invalids["price"] = "Lower than zero";
        }
        if (array_key_exists("description", $body))
            $patch["description"] = $body["description"];
        if ($invalids)
            return ["isInvalid" => true, "invalids" => $invalids];
        else
            return ["isInvalid" => false, "body" => $patch];
    }

    public function validateCreateBody($body)
    {
        $invalids = [];

        if (!array_key_exists("name", $body))
            $invalids["name"] = "Required";
        if (!array_key_exists("code", $body))
            $invalids["code"] = "Required";
        if (!array_key_exists("price", $body))
            $invalids["price"] = "Required";

        $partialValidation = $this->validateUpdateBody($body);

        if ($invalids) {
            if ($partialValidation["isInvalid"])
                $invalids = array_merge($invalids, $partialValidation["invalids"]);
            return ["isInvalid" => true, "invalids" => $invalids];
        }
        return $partialValidation;
    }
}
