import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addItem, removeItem, calculateTotal, ShoppingCartItem } from '../shoppingCartSlice.ts';

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.shoppingCart.items);
  const total = useSelector((state: RootState) => state.shoppingCart.total);

  const handleAddItem = () => {
    const newItem: ShoppingCartItem = {
      id: Date.now(),
      name: 'Sample Item',
      price: 10.0,
    };
    dispatch(addItem(newItem));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [items, dispatch]);

  return (
    <div>
      <h2>Current Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default ShoppingCart;
