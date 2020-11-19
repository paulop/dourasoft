<?php


namespace App\Controller;


class ClientsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->RequestHandler->respondAs('json');
    }

    public function index()
    {
        $clients = $this->Clients->find("all", ["order" => ["id" => "DESC"]]);
        return $this->response->withStringBody(json_encode($clients));
    }

    public function view($id)
    {
        $client = $this->Clients->findById($id)->first();
        if (empty($client))
            return $this->response->withStringBody("{\"message\":\"Client Not Found\"}")->withStatus(404);

        return $this->response->withStringBody(json_encode($client));
    }

    public function add()
    {
        $this->request->allowMethod(['post']);

        $body = $this->request->getParsedBody();
        $validation = $this->validateCreateBody($body);
        if ($validation["isInvalid"])
            return $this->response->withStringBody(json_encode(["invalids" => $validation["invalids"]]))->withStatus(400);
        $client = $this->Clients->newEntity($validation["body"]);
        if ($this->Clients->save($client))
            return $this->response->withStringBody(json_encode($client))->withStatus(201);
        return $this->response->withStringBody("\"message\":\"Error on Create\"")->withStatus(500);

    }

    public function edit($id)
    {
        $this->request->allowMethod(['patch']);

        $client = $this->Clients->findById($id)->first();
        if (empty($client))
            return $this->response->withStringBody("{\"message\":\"Client Not Found\"}")->withStatus(404);

        $body = $this->request->getParsedBody();
        $validation = $this->validateUpdateBody($body);
        if ($validation["isInvalid"])
            return $this->response->withStringBody(json_encode(["invalids" => $validation["invalids"]]))->withStatus(400);

        $client = $this->Clients->patchEntity($client, $validation["body"]);
        if ($this->Clients->save($client))
            return $this->response->withStringBody(json_encode($client));
        return $this->response->withStringBody("\"message\":\"Error on Update\"")->withStatus(500);
    }

    public function delete($id)
    {
        $this->request->allowMethod(['delete']);

        $client = $this->Clients->findById($id)->first();
        if (empty($client))
            return $this->response->withStringBody("{\"message\":\"Client Not Found\"}")->withStatus(404);
        elseif ($this->Clients->delete($client))
            return $this->response->withStringBody("{\"message\":\"Client Deleted\"}");
        else
            return $this->response->withStringBody("{\"message\":\"Error on Delete\"}")->withStatus(500);
    }

    public function validateUpdateBody($body)
    {
        $patch = [];
        $invalids = [];
        if (array_key_exists("name", $body)) {
            if (trim($body["name"]))
                $patch["name"] = $body["name"];
            else
                $invalids["name"] = "Empty";
        }
        if (array_key_exists("address", $body)) {
            if (trim($body["address"]))
                $patch["address"] = $body["address"];
            else
                $invalids["address"] = "Empty";
        }
        if (array_key_exists("tel", $body))
            $patch["tel"] = $body["tel"];
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
        if (!array_key_exists("address", $body))
            $invalids["address"] = "Required";

        $partialValidation = $this->validateUpdateBody($body);

        if ($invalids) {
            if ($partialValidation["isInvalid"])
                $invalids = array_merge($invalids, $partialValidation["invalids"]);
            return ["isInvalid" => true, "invalids" => $invalids];
        }
        return $partialValidation;
    }

}
