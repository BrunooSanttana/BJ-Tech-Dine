import React, { useState, useEffect } from 'react';

const Sales = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('dinheiro'); // Estado para armazenar o método de pagamento

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/categories/${selectedCategory}/products`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };

      fetchProducts();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const selected = products.find(product => product.id === parseInt(selectedProduct, 10));
    if (selected) {
      setSelectedProductName(selected.name);
      setSelectedProductPrice(selected.price);
    } else {
      setSelectedProductName('');
      setSelectedProductPrice(0);
    }
  }, [selectedProduct, products]);

  const handleAddItem = () => {
    if (selectedCategory && selectedProduct && quantity > 0) {
      const itemTotal = selectedProductPrice * quantity;
      const existingOrderIndex = orders.findIndex(order => order.tableNumber === tableNumber);

      if (existingOrderIndex !== -1) {
        const existingOrder = orders[existingOrderIndex];
        const existingItemIndex = existingOrder.items.findIndex(item => item.product === selectedProduct);

        if (existingItemIndex !== -1) {
          // Atualizar o item existente
          const updatedOrders = [...orders];
          const itemToUpdate = updatedOrders[existingOrderIndex].items[existingItemIndex];
          itemToUpdate.quantity += quantity;
          itemToUpdate.total = itemToUpdate.price * itemToUpdate.quantity;

          // Atualizar o estado
          updatedOrders[existingOrderIndex] = {
            ...existingOrder,
            items: [
              ...updatedOrders[existingOrderIndex].items.slice(0, existingItemIndex),
              itemToUpdate,
              ...updatedOrders[existingOrderIndex].items.slice(existingItemIndex + 1)
            ]
          };
          setOrders(updatedOrders);
        } else {
          // Adicionar um novo item
          const updatedOrders = [...orders];
          updatedOrders[existingOrderIndex].items.push({
            category: selectedCategory,
            product: selectedProduct,
            productName: selectedProductName,
            price: selectedProductPrice,
            quantity: quantity,
            total: itemTotal
          });
          setOrders(updatedOrders);
        }
      } else {
        // Adicionar um novo pedido
        const newOrder = {
          tableNumber,
          items: [
            {
              category: selectedCategory,
              product: selectedProduct,
              productName: selectedProductName,
              price: selectedProductPrice,
              quantity: quantity,
              total: itemTotal
            }
          ]
        };
        setOrders([...orders, newOrder]);
      }

      setSelectedCategory('');
      setSelectedProduct('');
      setSelectedProductName('');
      setSelectedProductPrice(0);
      setQuantity(1);
    }
  };

  const handleRemoveItem = (orderIndex, itemIndex) => {
    const updatedOrders = [...orders];
    const itemToRemove = updatedOrders[orderIndex].items[itemIndex];

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        // Decrementar a quantidade e atualizar o total
        itemToRemove.quantity -= 1;
        itemToRemove.total = itemToRemove.price * itemToRemove.quantity;
      } else {
        // Remover o item se a quantidade for 1
        updatedOrders[orderIndex].items.splice(itemIndex, 1);
      }

      if (updatedOrders[orderIndex].items.length === 0) {
        updatedOrders.splice(orderIndex, 1);
      }
      setOrders(updatedOrders);
    }
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmitOrder = async () => {
    if (!tableNumber) {
      alert('Por favor, informe o número da mesa.');
      return;
    }
  
    const currentOrderIndex = orders.findIndex(order => order.tableNumber === tableNumber);
  
    if (currentOrderIndex === -1 || orders[currentOrderIndex].items.length === 0) {
      alert('Por favor, adicione itens ao pedido antes de finalizar.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableNumber,
          paymentMethod, // Usar o método de pagamento selecionado
          items: orders[currentOrderIndex].items
        }),
      });
  
      if (response.ok) {
        alert('Pedido realizado com sucesso!');
        const updatedOrders = orders.filter((_, index) => index !== currentOrderIndex);
        setOrders(updatedOrders);
        setTableNumber(''); // Limpa o número da mesa
        setPaymentMethod('dinheiro'); // Reseta o método de pagamento
      } else {
        alert('Erro ao realizar o pedido');
      }
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
      alert('Erro ao realizar o pedido');
    }
  };

  return (
    <div>
      <h2 className="centered-title">Vendas</h2>
      <div>
        <label>
          Número da Mesa/Comanda ou Cliente:
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Informe o número ou nome do cliente"
          />
        </label>
      </div>

      <div>
        <label>
          Categoria:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Selecione a Categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Produto:
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">Selecione o Produto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Quantidade:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </label>
      </div>

      <button onClick={handleAddItem}>Adicionar Item</button>

      <h3>Pedidos</h3>
      {orders.length === 0 && <p>Nenhum pedido adicionado.</p>}
      <ul>
        {orders.map((order, orderIndex) => (
          <li key={orderIndex}>
            Mesa/Cliente: {order.tableNumber}
            <ul>
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  Produto: {item.productName} | Preço: R${item.price.toFixed(2)} | Quantidade: {item.quantity} | Total: R${item.total.toFixed(2)}
                  <button onClick={() => handleRemoveItem(orderIndex, itemIndex)}>Remover</button>
                </li>
              ))}
            </ul>
            <strong>Total do Pedido: R${calculateOrderTotal(order).toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <div>
        <label>
          Forma de Pagamento:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
          </select>
        </label>
      </div>

      <button onClick={handleSubmitOrder}>Finalizar Pedido</button>
    </div>
  );
};

export default Sales;
