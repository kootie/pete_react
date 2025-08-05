
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Add a simple modal component for the order form
const OrderModal = ({ open, onClose, onSubmit, items }: { open: boolean, onClose: () => void, onSubmit: (name: string, email: string) => void, items: string[] }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Name</label>
          <input className="border rounded px-3 py-2 w-full" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input className="border rounded px-3 py-2 w-full" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" type="email" />
        </div>
        <div className="mb-4">
          <div className="font-medium mb-1">Items:</div>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(name, email)} disabled={!name || !email}>Submit Order</Button>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [showOrderModal, setShowOrderModal] = useState(false);

  const menuCategories = {
    breakfast: {
      title: "Breakfast",
      subcategories: [
        {
          name: "Fruit Platters",
          items: [
            { name: "Selection of Seasonal Fruits Platter", price: "KES 780", description: "Pineapple/Papaya/Mango/Sweet Melon/Watermelon" },
            { name: "Assorted Fruit Salad", price: "KES 590", description: "Seasoned varieties of fruits served with vanilla yoghurt, honey and nuts" },
          ]
        },
        {
          name: "Egg Dishes",
          items: [
            { name: "Spanish Omelette", price: "KES 650", description: "2 eggs with tomatoes, onion, green pepper, toast and lyonnaise potatoes" },
            { name: "Everyday Breakfast", price: "KES 650", description: "Two eggs on toast cooked to your liking, served with baked beans, potatoes (lyonnaise/heaven), sausage and grilled tomato" },
            { name: "Fried Eggs with Toast", price: "KES 420", description: "2 eggs, fried sunny side up, over easy, medium, or well done, served with toast" },
          ]
        },
        {
          name: "Breakfast Burritos",
          items: [
            { name: "Egg, Cheese and Steak", price: "KES 750", description: "Homemade tortillas with your choice of filling, served with tomato salsa, sour cream and guacamole" },
            { name: "Egg, Cheese, Sausage and Macon", price: "KES 850", description: "Homemade tortillas with your choice of filling, served with tomato salsa, sour cream and guacamole" },
          ]
        },
        {
          name: "Breakfast Croissant",
          items: [
            { name: "Breakfast Croissant", price: "KES 950", description: "Macon, cheese, sausage, eggs" },
          ]
        },
        {
          name: "Chicken Waffle",
          items: [
            { name: "Chicken Waffle", price: "KES 950", description: "4 pieces of chicken waffles, 2 poached eggs topped with hollandaise sauce" },
          ]
        },
        {
          name: "Pete's Power Big Breakfast",
          items: [
            { name: "Pete's Power Big Breakfast", price: "KES 950", description: "2 fried eggs, macon, sausage, pancake, Hash Brown Or Lyonnaise Potatoes. Served with Tea/Coffee" },
          ]
        },
        {
          name: "Pancakes",
          items: [
            { name: "Buttermilk Pancakes", price: "KES 550", description: "Fluffy hot pan cakes, made from butter milk served with either honey, maple syrup or chocolate sauce" },
            { name: "Strawberry Cream Pancake", price: "KES 750", description: "Fresh strawberries pancakes, 2 eggs with a choice of macon or sausage" },
          ]
        },
        {
          name: "Breakfast Bagels",
          items: [
            { name: "Egg, Cheese and Macon", price: "KES 650", description: "A ring-shaped dense bread roll boiled and oven baked" },
            { name: "Egg Cheese and Sausage", price: "KES 650", description: "A ring-shaped dense bread roll boiled and oven baked" },
            { name: "Plain Bagel Toasted with Butter", price: "KES 250", description: "A ring-shaped dense bread roll boiled and oven baked" },
          ]
        },
        {
          name: "Waffles",
          items: [
            { name: "Waffles with Ice Cream", price: "KES 750", description: "Delicious waffles served with ice cream" },
            { name: "Plain Waffles", price: "KES 550", description: "Classic plain waffles" },
          ]
        },
        {
          name: "Other Breakfast",
          items: [
            { name: "Homemade Granola", price: "KES 550", description: "Fresh homemade granola" },
          ]
        },
      ]
    },
    salads: {
      title: "Salads",
      subcategories: [
        {
          name: "Fresh Salads",
          items: [
            { name: "Greek Salad", price: "KES 850", description: "A classical healthy salad of aromatic tomatoes, cucumber, sweet peppers, onions, lettuce, black olives, feta cheese, oregano and capers vinaigrette" },
            { name: "Classic Chicken Caesar Salad", price: "KES 890", description: "Lettuce, parmesan cheese, croutons and anchovy garlic dressing with chicken toppings" },
            { name: "House Garden Salad", price: "KES 550", description: "Avocado lettuce tomatoes, cucumber, beetroot, carrots and vinaigrette dressing" },
          ]
        },
      ]
    },
    wraps: {
      title: "Wraps & Rolex",
      subcategories: [
        {
          name: "Wraps & Rolex",
          items: [
            { name: "Pete's Rolex", price: "KES 500", description: "A combination of eggs sausage tomato and onion. Served in a warm tortilla or chapati and guacamole on the side" },
            { name: "A Vegetarian Wrap", price: "KES 450", description: "Mixed spring vegetable Julienne(s), sautéed with soy, olive and sesame oil, wrapped in homemade tortilla" },
          ]
        },
      ]
    },
    soups: {
      title: "Soups",
      subcategories: [
        {
          name: "Hot Soups",
          items: [
            { name: "Butternut Soup", price: "KES 450", description: "A creamy textured squash soup with an excellent flavor from the best ingredients" },
            { name: "Coconut Beans", price: "KES 680", description: "Flavourful yellow beans cooked by incorporating coconut puree" },
            { name: "Forest Mushroom Soup", price: "KES 500", description: "Flavored with chopped Coriander" },
            { name: "Chinese Chicken & Noodle Soup", price: "KES 550", description: "A traditional Chinese soup with a touch of sweetcorn" },
            { name: "Soup of the Day", price: "KES 450", description: "Chef's special soup. All served with bread and butter" },
          ]
        },
      ]
    },
    maincourses: {
      title: "Main Courses",
      subcategories: [
        {
          name: "From the Waters",
          items: [
            { name: "Pan Fried Fillet of Lake Tilapia", price: "KES 1300", description: "Grilled fish fillet, served with lemon and capers butter sauce" },
            { name: "Panko Fried Fish", price: "KES 1190", description: "Breaded fried fish fillet, served with tartar sauce and steamed vegetables" },
            { name: "Wet Fry Tilapia", price: "KES 1090", description: "Fresh tilapia prepared wet fry style" },
            { name: "Dry Fry Tilapia", price: "KES 1090", description: "Fresh tilapia prepared dry fry style" },
            { name: "Coconut Stewed Victoria Fish", price: "KES 1090", description: "Fresh from Lake Victoria, deep fried and stewed in coconut sauce" },
          ]
        },
        {
          name: "Lamb",
          items: [
            { name: "Balsamic Honey Glazed Lamb Ribs", price: "KES 1300", description: "Prime ribs of lamb, flavored and tenderized in more poix, lightly grilled and finished with honey-balsamic mix" },
            { name: "Lamb Chops", price: "KES 1350", description: "Prime lamb chops, honey glazed and served in a tangy sweet and sour sauce" },
          ]
        },
        {
          name: "Pete's Signature Platters",
          items: [
            { name: "Platter for 2", price: "KES 3100", description: "Consisting of a portion each, of rosemary chicken, lamb ribs, Beef fillet, 2 Pcs of Choma sausage" },
            { name: "Platter for 4", price: "KES 6200", description: "Consisting of a portion each, of rosemary chicken, lamb ribs, Beef fillet, 2 Pcs of Choma sausage" },
          ]
        },
        {
          name: "Steaks & Grills",
          items: [
            { name: "Sirloin Steak", price: "KES 1490", description: "New York strip, marinated and grilled to your liking, served with black peppercorn sauce" },
            { name: "Sweet and Sour Beef Ribs", price: "KES 1450", description: "Beef ribs flavored in its stock, lightly grilled, Honey glazed, served in a tangy sweet and sour sauce" },
            { name: "Mixed Grill", price: "KES 1490", description: "Lamb chops, beef medallion, chicken drum stick and beef boerewors" },
            { name: "Beef Fillet Steak", price: "KES 1300", description: "Tender fillet of beef, marinated with French herbs, and grilled to your perfection, served with Black peppercorn sauce" },
            { name: "Beef Stroganoff", price: "KES 1090", description: "Slow cooked Ugandan beef in velvet mushroom finished with cream" },
          ]
        },
        {
          name: "Indian",
          items: [
            { name: "Chicken Curry", price: "KES 1250", description: "Boneless chicken, marinated in Indian spices, char grilled in tandoori and simmered in curry sauce" },
            { name: "Butter Chicken", price: "KES 1300", description: "Barbequed Boneless Chicken pieces cooked in our special tomato and cashew nut sauce, blended with various spices" },
            { name: "Fish Curry", price: "KES 1300", description: "Fillet of fish, marinated in Indian spices, char grilled in tandoori and simmered in curry sauce" },
          ]
        },
        {
          name: "Chicken",
          items: [
            { name: "Grilled Chicken Breast Moroccan Style", price: "KES 1300", description: "Combination of sweet and tangy flavors from North Africa" },
            { name: "Kienyeji Chicken Half", price: "KES 1290", description: "Home made kienyeji chicken, slow cooked, served with creamy spinach and brown ugali" },
            { name: "Kienyeji Chicken Full", price: "KES 2500", description: "Home made kienyeji chicken, slow cooked, served with creamy spinach and brown ugali" },
            { name: "Chicken Kastu", price: "KES 1290", description: "Crispy coated Japanese chicken breast, served with slow cooked coconut vegetable rice, side of avocado then garnished with black sesame seeds" },
            { name: "Chicken Cordon Bleu", price: "KES 1290", description: "French chicken breast, filled with cheese and spinach, rolled up, breaded then baked" },
            { name: "Southern Fried Chicken", price: "KES 1200", description: "A Scottish styled chicken, marinated in salt, pepper and garlic, battered and deep fried" },
          ]
        },
        {
          name: "Vegetarian",
          items: [
            { name: "Mixed Vegetable Curry", price: "KES 900", description: "A rich creamy curry dish of potatoes, carrots, cauliflower and garden peas" },
          ]
        },
        {
          name: "Oriental Stir Frys",
          items: [
            { name: "Chicken Stir Fry", price: "KES 1100", description: "Julienne of chicken fried with garlic, onions, bell pepper, carrots and ginger finished with Soy Sauce and Oyster sauce" },
            { name: "Beef Stir Fry", price: "KES 1090", description: "Julienne of beef fried with garlic, onions, bell pepper, carrots and ginger finished with Soy Sauce and Oyster sauce" },
            { name: "Fish Stir Fry", price: "KES 1250", description: "Julienne of fish fried with garlic, onions, bell pepper, carrots and ginger finished with Soy Sauce and Oyster sauce" },
          ]
        },
        {
          name: "Quesadillas",
          items: [
            { name: "Chicken Quesadilla", price: "KES 950", description: "Cubes of chicken, with grated cheese, guacamole, salsa wrapped in a warm tortilla" },
            { name: "Spinach and Cheese Quesadilla", price: "KES 790", description: "Spiced spinach, with grated cheese, guacamole, salsa wrapped in a warm tortilla" },
            { name: "Beef Quesadilla", price: "KES 850", description: "Cubes of beef, with grated cheese, guacamole, salsa wrapped in a warm tortilla" },
          ]
        },
        {
          name: "Mexican",
          items: [
            { name: "Beef Burrito", price: "KES 930", description: "Homemade tortillas with a filling of beef, cheese, salsa, sour cream and guacamole. Served with black beans and cilantro rice or Spanish rice" },
            { name: "Chicken Burrito", price: "KES 930", description: "Homemade tortillas with a filling of chicken, cheese, salsa, sour cream and guacamole. Served with black beans and cilantro rice or Spanish rice" },
            { name: "Bean and Mixed Veg. Burrito", price: "KES 750", description: "Homemade tortillas with a filling of mixed vegetables, cheese, salsa, sour cream and guacamole. Served with black beans and cilantro rice or Spanish rice" },
          ]
        },
        {
          name: "Italian",
          items: [
            { name: "Alla Cabonara", price: "KES 1090", description: "Cooked al-dente, blended with egg yolks, cheese, and smoked bacon in creamy sauce" },
            { name: "Chicken Aglio, Olio", price: "KES 1090", description: "Boneless chicken, tossed in garlic, olive oil and chilies, with your choice of pasta. Reputed to be a Cure for your cravings" },
            { name: "Bolognaise", price: "KES 990", description: "Traditional lean minced beef cooked in tomato sauce and Italian herbs" },
          ]
        },
        {
          name: "Tacos",
          items: [
            { name: "Chicken Tacos", price: "KES 950", description: "Chicken strips sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
            { name: "Beef Tacos", price: "KES 850", description: "Pulled Beef flakes sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
            { name: "Fish Tacos", price: "KES 950", description: "Fish strips sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
            { name: "Veggie Tacos", price: "KES 790", description: "Mixed vegetable juliennes sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
          ]
        },
        {
          name: "Biryani",
          items: [
            { name: "Chicken Biryani", price: "KES 1090", description: "Mixed rice dish made with rice, chicken and a combination of herbs and spices" },
            { name: "Mutton Biryani", price: "KES 1090", description: "Mixed rice dish made with rice, mutton and a combination of herbs and spices" },
            { name: "Beef Biryani", price: "KES 1050", description: "Mixed rice dish made with rice, beef and a combination of herbs and spices" },
          ]
        },
      ]
    },
    sides: {
      title: "Side Orders",
      subcategories: [
        {
          name: "Side Orders",
          items: [
            { name: "Macon", price: "KES 270", description: "Crispy bacon" },
            { name: "Cheese", price: "KES 200", description: "Fresh cheese" },
            { name: "Nachos", price: "KES 450", description: "Crispy nachos" },
            { name: "Chapati", price: "KES 100", description: "Fresh chapati" },
            { name: "Plantains", price: "KES 350", description: "Fried plantains" },
            { name: "Plain Rice", price: "KES 300", description: "Steamed rice" },
            { name: "2 Sausages", price: "KES 260", description: "Two sausages" },
            { name: "Guacamole", price: "KES 120", description: "Fresh guacamole" },
            { name: "3 Piece Samosa", price: "KES 380", description: "Three samosas" },
            { name: "Mayonnaise", price: "KES 170", description: "Fresh mayonnaise" },
            { name: "Plain Toast", price: "KES 150", description: "Toasted bread" },
            { name: "Sour Cream", price: "KES 100", description: "Fresh sour cream" },
            { name: "French Fries", price: "KES 250", description: "Crispy french fries" },
            { name: "Avocado Fan", price: "KES 150", description: "Fresh avocado" },
            { name: "Chips Masala", price: "KES 380", description: "Spiced chips" },
            { name: "French Toast", price: "KES 350", description: "French toast" },
            { name: "Mashed Potatoes", price: "KES 100", description: "Creamy mashed potatoes" },
            { name: "Lyonnaise Potatoes", price: "KES 300", description: "Lyonnaise style potatoes" },
            { name: "Vegetable Fried Rice", price: "KES 100", description: "Vegetable fried rice" },
            { name: "Ugali Brown/White", price: "KES 100", description: "Traditional ugali" },
          ]
        },
      ]
    },
    beverages: {
      title: "Beverages",
      subcategories: [
        {
          name: "Coffee",
          items: [
            { name: "Popcorn Latte Single", price: "KES 320", description: "Espresso, steamed milk and little smooth froth, finished with popcorn syrup" },
            { name: "Popcorn Latte Double", price: "KES 360", description: "Espresso, steamed milk and little smooth froth, finished with popcorn syrup" },
            { name: "Espresso Single", price: "KES 130", description: "Shot of round strong flavorful coffee with a sweet after taste" },
            { name: "Espresso Double", price: "KES 190", description: "Shot of round strong flavorful coffee with a sweet after taste" },
            { name: "House Coffee", price: "KES 250", description: "Black coffee with a balanced taste and flavor" },
            { name: "Latte Machiato Single", price: "KES 220", description: "An exciting delicious multi-layered drink of espresso and milk" },
            { name: "Latte Machiato Double", price: "KES 260", description: "An exciting delicious multi-layered drink of espresso and milk" },
            { name: "Hazelnut Cappuccino Single", price: "KES 320", description: "A nutty sweet coffee drink" },
            { name: "Hazelnut Cappuccino Double", price: "KES 360", description: "A nutty sweet coffee drink" },
            { name: "Oreo Chocolate Latte Single", price: "KES 320", description: "Our signature espresso made with steamed milk and topped with micro foam, white chocolate, crumbled oreos, whipped cream & chocolate drizzle" },
            { name: "Oreo Chocolate Latte Double", price: "KES 360", description: "Our signature espresso made with steamed milk and topped with micro foam, white chocolate, crumbled oreos, whipped cream & chocolate drizzle" },
            { name: "Caramel Macchiato Single", price: "KES 320", description: "A delicious multi layered drink of espresso, steamed milk and dense foam finished with caramel syrup" },
            { name: "Caramel Macchiato Double", price: "KES 360", description: "A delicious multi layered drink of espresso, steamed milk and dense foam finished with caramel syrup" },
            { name: "Americano Single", price: "KES 200", description: "Hot water topped with double shot espresso" },
            { name: "Americano Double", price: "KES 250", description: "Hot water topped with double shot espresso" },
            { name: "Cafe Latte Single", price: "KES 280", description: "Espresso, steamed milk, and little smooth froth" },
            { name: "Cafe Latte Double", price: "KES 320", description: "Espresso, steamed milk, and little smooth froth" },
            { name: "Cappuccino Single", price: "KES 250", description: "Harmonious balanced cup of sweet rich milk and espresso" },
            { name: "Cappuccino Double", price: "KES 300", description: "Harmonious balanced cup of sweet rich milk and espresso" },
            { name: "Spiced Vanilla Latte Single", price: "KES 320", description: "Espresso, steamed milk, vanilla syrup and ginger spice" },
            { name: "Spiced Vanilla Latte Double", price: "KES 360", description: "Espresso, steamed milk, vanilla syrup and ginger spice" },
            { name: "Cafe Mocha Single", price: "KES 300", description: "Espresso, steamed milk, chocolate and little froth" },
            { name: "Cafe Mocha Double", price: "KES 350", description: "Espresso, steamed milk, chocolate and little froth" },
          ]
        },
        {
          name: "Classic Teas",
          items: [
            { name: "African Tea Single", price: "KES 200", description: "Milk and tea boiled on the African jiko" },
            { name: "African Tea Double", price: "KES 250", description: "Milk and tea boiled on the African jiko" },
            { name: "English Tea Single", price: "KES 200", description: "Hot water, served with milk and tea bag a side" },
            { name: "English Tea Double", price: "KES 250", description: "Hot water, served with milk and tea bag a side" },
            { name: "Chai Latte Single", price: "KES 300", description: "Semi sweet, spicy tea combined with steamed milk" },
            { name: "Chai Latte Double", price: "KES 350", description: "Semi sweet, spicy tea combined with steamed milk" },
            { name: "Herbal Teas Single", price: "KES 230", description: "Pepper mint, chamomile, green tea, raspberry, Hibiscus" },
            { name: "Herbal Teas Double", price: "KES 260", description: "Pepper mint, chamomile, green tea, raspberry, Hibiscus" },
            { name: "Lemon Tea Single", price: "KES 300", description: "Black tea with a hint of lemon juice" },
            { name: "Lemon Tea Double", price: "KES 350", description: "Black tea with a hint of lemon juice" },
          ]
        },
        {
          name: "Special Teas",
          items: [
            { name: "Orange and Turmeric Dawa Single", price: "KES 280", description: "Lemon, honey, ginger, turmeric & orange" },
            { name: "Orange and Turmeric Dawa Double", price: "KES 320", description: "Lemon, honey, ginger, turmeric & orange" },
            { name: "Turmeric Dawa Single", price: "KES 250", description: "Lemon honey, ginger turmeric" },
            { name: "Turmeric Dawa Double", price: "KES 300", description: "Lemon honey, ginger turmeric" },
            { name: "Classic Dawa Single", price: "KES 250", description: "Lemon, Honey and Ginger boiled together" },
            { name: "Classic Dawa Double", price: "KES 300", description: "Lemon, Honey and Ginger boiled together" },
            { name: "Cinnamon Dawa Single", price: "KES 250", description: "Lemon, honey, ginger & cinnamon" },
            { name: "Cinnamon Dawa Double", price: "KES 300", description: "Lemon, honey, ginger & cinnamon" },
          ]
        },
        {
          name: "Iced Drinks",
          items: [
            { name: "Iced Flavoured Tea Double", price: "KES 350", description: "Ice cubes, mineral water, and your choice of herbal tea" },
            { name: "Iced Lemon and Ginger (Dawa) Double", price: "KES 350", description: "Ice cubes, mineral water, ginger and honey" },
          ]
        },
        {
          name: "Juices",
          items: [
            { name: "Mango Minty Pinead Single", price: "KES 300", description: "Fresh mango and pineapple juice" },
            { name: "Mango Minty Pinead Double", price: "KES 400", description: "Fresh mango and pineapple juice" },
            { name: "Watermelon Single", price: "KES 280", description: "Fresh watermelon juice" },
            { name: "Watermelon Double", price: "KES 380", description: "Fresh watermelon juice" },
            { name: "Orange Single", price: "KES 280", description: "Fresh orange juice" },
            { name: "Orange Double", price: "KES 380", description: "Fresh orange juice" },
            { name: "Papaya Single", price: "KES 280", description: "Fresh papaya juice" },
            { name: "Papaya Double", price: "KES 380", description: "Fresh papaya juice" },
            { name: "Mango Single", price: "KES 280", description: "Fresh mango juice" },
            { name: "Mango Double", price: "KES 380", description: "Fresh mango juice" },
            { name: "Passion Single", price: "KES 280", description: "Fresh passion juice" },
            { name: "Passion Double", price: "KES 380", description: "Fresh passion juice" },
            { name: "Pineapple Single", price: "KES 280", description: "Fresh pineapple juice" },
            { name: "Pineapple Double", price: "KES 380", description: "Fresh pineapple juice" },
            { name: "Fresh Lemonade Single", price: "KES 280", description: "Fresh lemonade" },
            { name: "Fresh Lemonade Double", price: "KES 380", description: "Fresh lemonade" },
          ]
        },
        {
          name: "Mocktails",
          items: [
            { name: "Lemonade Classic", price: "KES 450", description: "Classic lemonade mocktail" },
            { name: "Passion Mojito", price: "KES 450", description: "Passion fruit mojito mocktail" },
            { name: "Strawberry Mojito", price: "KES 450", description: "Strawberry mojito mocktail" },
            { name: "Kiwi Mojito", price: "KES 450", description: "Kiwi mojito mocktail" },
          ]
        },
        {
          name: "Smoothies",
          items: [
            { name: "Banana Smoothie", price: "KES 450", description: "Banana, yoghurt, ice" },
            { name: "Mango Smoothie", price: "KES 450", description: "Mango, yoghurt, ice" },
            { name: "Avocado and Mango Smoothie", price: "KES 480", description: "Avocado, Mango, yoghurt, ice" },
            { name: "Beetroot and Papaya", price: "KES 480", description: "Beetroot, papaya, yoghurt, ice" },
            { name: "Pete's Smoothie", price: "KES 500", description: "Strawberry, Mango, Papaya and Yoghurt" },
            { name: "Jumpstart", price: "KES 520", description: "Granola, fresh fruits, mint, honey and Yoghurt" },
            { name: "Green Smoothie", price: "KES 480", description: "Cucumber, Apple Fruit, Ginger, Spinach, Lemon Juice and honey and Yoghurt" },
          ]
        },
        {
          name: "Shakes",
          items: [
            { name: "Fudge Shake", price: "KES 520", description: "Chocolate ice cream, brownies and milk" },
            { name: "Mango Shake", price: "KES 490", description: "Mango ice cream, and milk" },
            { name: "Chocolate Shake", price: "KES 490", description: "Chocolate, ice cream, and milk" },
            { name: "Espresso Shake", price: "KES 490", description: "Espresso, vanilla ice cream, and milk" },
            { name: "Mixed Fruit Shake", price: "KES 520", description: "Banana, mango, blueberry-cherries, beetroot, vanilla ice cream and milk" },
            { name: "Funky Nut Shake", price: "KES 520", description: "Vanilla ice cream, peanuts and milk" },
            { name: "Blueberry Shake", price: "KES 520", description: "Blueberry ice cream and milk" },
            { name: "Mocha Shake", price: "KES 520", description: "Vanilla ice cream, chocolate, coffee granules and milk" },
            { name: "Strawberry Shake", price: "KES 490", description: "Strawberry ice cream and milk" },
            { name: "Banana Shake", price: "KES 490", description: "Banana, vanilla ice cream and milk" },
            { name: "Vanilla Shake", price: "KES 490", description: "Vanilla ice cream and milk" },
            { name: "Oreo Shake", price: "KES 520", description: "Oreo ice cream and milk" },
          ]
        },
        {
          name: "Soft Drinks",
          items: [
            { name: "Sodas", price: "KES 160", description: "Various soft drinks" },
            { name: "Diet Coke", price: "KES 190", description: "Diet coke" },
          ]
        },
        {
          name: "Mineral Water",
          items: [
            { name: "Mineral Water 1 litre", price: "KES 270", description: "1 litre mineral water" },
            { name: "Mineral Water 500 ml", price: "KES 180", description: "500 ml mineral water" },
            { name: "Sparkling Water 500 ml", price: "KES 240", description: "500 ml sparkling water" },
            { name: "Sparkling Water 1 litre", price: "KES 350", description: "1 litre sparkling water" },
          ]
        },
      ]
    },
  };

  const toggleItem = (itemName: string) => {
    setSelectedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const handleOrder = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to order");
      return;
    }
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (name: string, email: string) => {
    const order = {
      id: Date.now(),
      name,
      email,
      items: selectedItems,
      time: new Date().toISOString(),
      status: "pending"
    };
    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
    orders.push(order);
    localStorage.setItem("petes_orders", JSON.stringify(orders));
    setShowOrderModal(false);
    setSelectedItems([]);
    alert("Order placed! You will receive a confirmation email soon.");
  };

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} onSubmit={handleOrderSubmit} items={selectedItems} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-pete-brown to-pete-teal">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand text-white mb-6">
            Our Menu
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of premium coffee, 
            fresh pastries, and delicious meals from breakfast to dinner.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 flex-wrap">
            {Object.entries(menuCategories).map(([key, category]) => (
              <Button
                key={key}
                onClick={() => setActiveCategory(key)}
                variant={activeCategory === key ? "default" : "outline"}
                className={`px-6 py-3 font-medium mb-2 ${
                  activeCategory === key 
                    ? "bg-pete-teal hover:bg-pete-teal/90 text-white" 
                    : "border-pete-teal text-pete-teal hover:bg-pete-teal hover:text-white"
                }`}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-quicksand text-pete-brown mb-4">
              {menuCategories[activeCategory as keyof typeof menuCategories].title}
            </h2>
          </div>
          {menuCategories[activeCategory as keyof typeof menuCategories].subcategories.map((subcategory) => (
            <div key={subcategory.name} className="mb-12">
              <div className="mb-6">
                <span className="inline-block bg-pete-teal/10 text-pete-teal font-semibold px-4 py-2 rounded-full text-lg mb-2">
                  {subcategory.name}
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {subcategory.items.map((item) => (
                  <Card 
                    key={item.name}
                    className={`shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      selectedItems.includes(item.name) ? 'ring-2 ring-pete-teal bg-pete-teal/5' : ''
                    }`}
                    onClick={() => toggleItem(item.name)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold font-quicksand text-pete-brown">
                          {item.name}
                        </h3>
                        <span className="text-lg font-bold text-pete-teal">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          selectedItems.includes(item.name) 
                            ? 'text-pete-teal' 
                            : 'text-gray-400'
                        }`}>
                          {selectedItems.includes(item.name) ? 'Selected' : 'Click to select'}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedItems.includes(item.name)
                            ? 'bg-pete-teal border-pete-teal'
                            : 'border-gray-300'
                        }`}>
                          {selectedItems.includes(item.name) && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Summary */}
      {selectedItems.length > 0 && (
        <section className="py-8 bg-pete-teal/10 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-4">
                  Your Order ({selectedItems.length} items)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedItems.map((item) => (
                    <div key={item} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{item}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleItem(item)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={handleOrder}
                    className="bg-pete-teal hover:bg-pete-teal/90 text-white px-8 py-3 text-lg font-medium"
                  >
                    Place Order via Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Menu;
