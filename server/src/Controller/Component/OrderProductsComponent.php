<?php


namespace App\Controller\Component;


use Cake\Controller\Component;
use Cake\ORM\TableRegistry;
use Exception;

class OrderProductsComponent extends Component
{
    private $OrderProducts;
    private $Products;

    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->OrderProducts = TableRegistry::getTableLocator()->get('OrderProductsTable');
        $this->Products = TableRegistry::getTableLocator()->get('Products');
    }

    public function getConnection()
    {
        return $this->OrderProducts->getConnection();
    }

    public function deleteProducts($orderId)
    {
        return $this->OrderProducts->deleteAll(["orderId" => $orderId]);
    }

    public function update($orderId, $orderProducts)
    {
        $this->deleteProducts($orderId);
        return $this->createOrderProducts($orderId, $orderProducts);
    }

    public function getTotalAndProducts($orderId)
    {
        $products = $this->OrderProducts->find()->where(["id" => $orderId])->toList();
        $total = 0;
        foreach ($products as $product)
            $total += $product["unitValue"]*$product["quantity"];
        return ["products" => $products, "total" => $total];
    }

    public function createOrderProducts($orderId, $orderProducts)
    {
        $products = [];
        $total = 0;
        foreach ($orderProducts as $orderProduct) {
            if (!array_key_exists("quantity", $orderProduct))
                return false;

            $product = $this->Products->get($orderProduct["id"]);

            $unitValue = $product["price"];
            if (array_key_exists("unitValue", $orderProduct))
                $unitValue = $orderProduct["unitValue"];

            $product = [
                "orderId" => $orderId,
                "productId" => $product["id"],
                "quantity" => $orderProduct["quantity"],
                "unitValue" => $unitValue
            ];
            $product = $this->OrderProducts->newEntity($product);
            $this->OrderProducts->saveOrFail($product, ["atomic" => false]);
            $total += $product["quantity"] * $product["unitValue"];
            $products[] = $product;
        }
        return ["total" => $total, "products" => $products];
    }


}
