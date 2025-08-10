
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
            { name: "Selection of Seasonal Fruits Platter", price: "KES 800", description: "Pineapple / Papaya / Mango / Sweet Melon / Watermelon" },
            { name: "Assorted Fruit Salad", price: "KES 650", description: "Seasonal varieties of fruits served with vanilla yoghurt, honey and nuts" },
          ]
        },
        {
          name: "Cereals and Yoghurt",
          items: [
            { name: "Cereals and Yoghurt", price: "KES 500", description: "Al Bran / Cornflakes / Coco Puffs / Weetabix / Muesli or Rice Krispies Served with whole or skimmed milk / A choice of plain or fruit yoghurt" },
          ]
        },
        {
          name: "From the Breakfast Pan",
          items: [
            { name: "Buttermilk Pancakes", price: "KES 550", description: "Fluffy hot pancakes, made from butter milk served with either honey, maple syrup or chocolate sauce" },
          ]
        },
        {
          name: "Pete's Power Big Breakfast",
          items: [
            { name: "Pete's Power Big Breakfast", price: "KES 1200", description: "2 Fried Eggs, Bacon, Sausage, Pancake, Hash Brown OR Lyonnaise Potatoes. Served with Tea / Coffee" },
          ]
        },
        {
          name: "Strawberry Cream Pancake",
          items: [
            { name: "Strawberry Cream Pancake", price: "KES 850", description: "Fresh strawberries pancakes, Harsh Brown potatoes, 2eggs with a choice of bacon or sausage" },
          ]
        },
        {
          name: "Breakfast Croissant",
          items: [
            { name: "Breakfast Croissant", price: "KES 750", description: "Bacon, cheese, sausage, eggs" },
          ]
        },
        {
          name: "Everyday Breakfast",
          items: [
            { name: "Everyday Breakfast", price: "KES 750", description: "With sausages, breakfast potatoes, baked beans, and grilled tomato" },
          ]
        },
        {
          name: "Plain Pancakes",
          items: [
            { name: "Plain Pancakes", price: "KES 550", description: "Classic plain pancakes" },
          ]
        },
        {
          name: "Homemade Granola",
          items: [
            { name: "Homemade Granola", price: "KES 550", description: "Rolled oats, healthy seeds, nuts, served with honey, yoghurt, banana or strawberries" },
          ]
        },
        {
          name: "Spanish Omelet",
          items: [
            { name: "Spanish Omelet", price: "KES 650", description: "2 eggs with tomato, onion, green pepper, toast" },
          ]
        },
        {
          name: "Fried Eggs",
          items: [
            { name: "Fried Eggs", price: "KES 450", description: "2 eggs, fried sunny side up, over easy, medium, or well done, set on toast" },
          ]
        },
        {
          name: "Breakfast Burritos",
          items: [
            { name: "Egg, Cheese, Sausage and Bacon", price: "KES 790", description: "Homemade tortillas with your choice of filling, served with tomato salsa, sour cream and guacamole" },
            { name: "Egg, Cheese and Steak", price: "KES 850", description: "Homemade tortillas with your choice of filling, served with tomato salsa, sour cream and guacamole" },
          ]
        },
        {
          name: "Breakfast Bagels",
          items: [
            { name: "Egg, Cheese and Bacon Bagel Toasted with Butter", price: "KES 700", description: "A ring-shaped dense bread roll boiled and oven baked" },
            { name: "Egg, Cheese and Sausage", price: "KES 670", description: "A ring-shaped dense bread roll boiled and oven baked" },
            { name: "Plain Bagel Toasted with Butter", price: "KES 300", description: "A ring-shaped dense bread roll boiled and oven baked" },
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
            { name: "Classic Chicken Caesar Salad", price: "KES 890", description: "Lettuce, parmesan cheese, croutons, and anchovy garlic dressing with chicken toppings" },
            { name: "House Garden Salad", price: "KES 600", description: "Avocado, lettuce, tomatoes, cucumber, beetroot, carrots, and vinaigrette dressing" },
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
            { name: "Soup of the Day (Chef's Special Soup)", price: "KES 450", description: "All served with bread and butter" },
          ]
        },
      ]
    },
    maincourses: {
      title: "Main Courses",
      subcategories: [
        {
          name: "From the Ocean, Lakes and Rivers",
          items: [
            { name: "Pan Fried Fillet of Lake Tilapia", price: "KES 1350", description: "Fillet of fish grilled and served with lemon and capers butter sauce" },
            { name: "Coconut Stewed Victoria Fish", price: "KES 1490", description: "Fresh from Lake Victoria, deep fried and stewed in coconut sauce" },
          ]
        },
        {
          name: "Steaks and Grills",
          items: [
            { name: "Beef Fillet Steak", price: "KES 1400", description: "Tender fillet of beef, marinated with french herbs, and grilled to your perfection, served with Black peppercorn sauce" },
            { name: "Sirloin Steak", price: "KES 1490", description: "New York strip, marinated and grilled to your liking, served with Black peppercorn sauce" },
            { name: "Mixed Grill", price: "KES 1490", description: "Lamb chops, beef medallion, chicken drum stick and beef boerewors" },
          ]
        },
        {
          name: "Lamb",
          items: [
            { name: "Balsamic Honey Glazed Lamb Ribs", price: "KES 1400", description: "Prime ribs of Lamb, flavored and tenderized in more poix, lightly grilled and finished with Honey-balsamic mix" },
          ]
        },
        {
          name: "Beef Stroganoff",
          items: [
            { name: "Beef Stroganoff", price: "KES 1300", description: "Slow cooked Ugandan beef in velvet mushroom finished with cream" },
          ]
        },
        {
          name: "Pete's Signature Platters",
          items: [
            { name: "Platter for 2", price: "KES 3100", description: "The ultimate choice for a family or friends having a meal together. Hearty selections of grilled Beef fillet, Rosemary Chicken, Lamb ribs and Choma sausage, sauteed in onions, garlic and tomatoes, served with BBQ sauce, vegetables and accompaniments of your choice" },
            { name: "Platter for 4", price: "KES 6200", description: "Consisting of 2 portions each, of rosemary chicken, lamb ribs, Beef fillet, 4 Pcs of Choma sausage" },
          ]
        },
        {
          name: "Chicken",
          items: [
            { name: "Grilled Chicken Breast (Moroccan Style)", price: "KES 1500", description: "Combination of sweet and tangy flavors from North Africa" },
            { name: "Southern Fried Chicken", price: "KES 1350", description: "A Scottish styled chicken, marinated in salt, pepper and garlic, battered and deep fried" },
            { name: "Grilled Lemon Chicken", price: "KES 1350", description: "A Special Cut of Chicken Breast, in Lemon and Mushroom Sauce" },
          ]
        },
        {
          name: "Indian Specialities",
          items: [
            { name: "Butter Chicken", price: "KES 1400", description: "Barbequed Boneless Chicken pieces cooked in our special tomato and cashew nut sauce, blended with various spices" },
            { name: "Chicken Curry", price: "KES 1300", description: "Boneless chicken, marinated in Indian spices, char-grilled in tandoori and simmered in curry sauce" },
            { name: "Fish Curry", price: "KES 1350", description: "Fillet of fish, marinated in Indian spices, char-grilled in tandoori and simmered in curry sauce" },
          ]
        },
        {
          name: "Vegetarian",
          items: [
            { name: "Mixed Vegetable Curry", price: "KES 1000", description: "A rich creamy curry dish of potatoes, carrots, cauliflower and garden peas" },
          ]
        },
        {
          name: "Oriental Stir Frys",
          items: [
            { name: "Beef Stir Fry", price: "KES 1390", description: "Julienne of beef fried with garlic, onions, bell pepper, carrots and ginger, finished with Soy Sauce and Oyster sauce" },
            { name: "Chicken Stir Fry", price: "KES 1350", description: "Julienne of chicken fried with garlic, onions, bell pepper, carrots and ginger, finished with Soy Sauce and Oyster sauce" },
            { name: "Fish Stir Fry", price: "KES 1490", description: "Julienne of fish fried with garlic, onions, bell pepper, carrots and ginger, finished with Soy Sauce and Oyster sauce" },
          ]
        },
        {
          name: "Italian Kitchen",
          items: [
            { name: "Alla Cabonara", price: "KES 1150", description: "Cooked al-dente, blended with egg yolks, cheese, and smoked bacon in creamy sauce" },
            { name: "Bolognaise", price: "KES 1050", description: "Traditional lean minced beef cooked in tomato sauce and Italian herbs" },
          ]
        },
        {
          name: "Mexican Specialities",
          items: [
            { name: "Beef Burrito", price: "KES 1000", description: "Homemade tortillas with a filling of beef, cheese, salsa, sour cream and guacamole, served with black beans and ciliantro rice or Spanish rice" },
            { name: "Chicken Burrito", price: "KES 1000", description: "Homemade tortillas with a filling of chicken, cheese, salsa, sour cream and guacamole, served with black beans and ciliantro rice or Spanish rice" },
            { name: "Bean and Mixed Veg Burrito", price: "KES 790", description: "Homemade tortillas with a filling of mixed vegetables, cheese, salsa, sour cream and guacamole, served with black beans and ciliantro rice or Spanish rice" },
          ]
        },
        {
          name: "Quesadillas",
          items: [
            { name: "Spinach and Cheese Quesadilla", price: "KES 790", description: "Spiced spinach, with gratinated cheese, guacamole, salsa wrapped in a warm tortilla" },
            { name: "Beef Quesadilla", price: "KES 890", description: "Cubes of beef, with gratinated cheese, guacamole, salsa wrapped in a warm tortilla" },
            { name: "Chicken Quesadilla", price: "KES 860", description: "Cubes of chicken, with gratinated cheese, guacamole, salsa wrapped in a warm tortilla" },
          ]
        },
        {
          name: "Tacos",
          items: [
            { name: "Beef Tacos", price: "KES 800", description: "Beef flakes sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
            { name: "Fish Tacos", price: "KES 850", description: "Fish strips sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
            { name: "Chicken Tacos", price: "KES 800", description: "Chicken strips sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
            { name: "Veggie Tacos", price: "KES 790", description: "Mixed vegetable juliennes sautéed in Mexican spices, folded in a tortilla with cheese, salsa, guacamole and sour cream" },
          ]
        },
        {
          name: "Biryani Corner",
          items: [
            { name: "Chicken Biryani", price: "KES 1300", description: "Basmati rice and chicken, cooked with various spices" },
            { name: "Mutton Biryani", price: "KES 1300", description: "Basmati rice and mutton, cooked with various spices" },
            { name: "Beef Biryani", price: "KES 1300", description: "Basmati rice and beef, cooked with various spices" },
          ]
        },
        {
          name: "Pizza Special",
          items: [
            { name: "Pete's Pizza", price: "KES 1350", description: "Pizza base sauce, mushrooms, capsicum, bacon, and mozzarella cheese" },
            { name: "Chicken Tikka", price: "KES 1300", description: "Pizza base sauce, peppers, onions, tikka sauce, boneless chicken, and mozzarella cheese" },
            { name: "Hawaiian Pizza", price: "KES 1200", description: "Pizza base sauce, ham, pineapple, and mozzarella cheese" },
            { name: "Margherita Pizza", price: "KES 1000", description: "Pizza base sauce, oregano, basil, and mozzarella cheese" },
            { name: "Choma Pizza", price: "KES 1400", description: "Pizza base sauce, roasted tender beef flakes, topped with classic kachumbari and mozzarella cheese" },
            { name: "Chicken BBQ Pizza", price: "KES 1300", description: "Pizza base sauce, chicken, sweet peppers, onions, and mozzarella cheese" },
          ]
        },
      ]
    },
    snacks: {
      title: "Snacks Corner",
      subcategories: [
        {
          name: "Sandwiches",
          items: [
            { name: "The Club Sandwich", price: "KES 1200", description: "Filled with chicken, beef/bacon, fried egg, tomatoes, cucumbers, lettuce and Mayo" },
            { name: "A Delicious Chicken or Beef Burger", price: "KES 990", description: "Chicken fillet, beef pate, veg pate, spread with mayonnaise; plain or topped with either Cheese, Bacon, Egg or Guacamole" },
            { name: "Toasted Chicken and Chedder Cheese Sandwich", price: "KES 890", description: "Filled with organic lettuce, chicken, chedder cheese and Mayo" },
            { name: "Beef Sandwich", price: "KES 890", description: "Filled with organic lettuce and-Grilled Steak and mustard" },
            { name: "Veggie Sandwich", price: "KES 650", description: "Filled with organic lettuce, onions, cucumber, tomatoes and Mayo" },
            { name: "Bacon, Lettuce and Tomato", price: "KES 650", description: "Bacon, lettuce and tomato" },
          ]
        },
        {
          name: "Other Snacks",
          items: [
            { name: "Barbeque Chicken Wings", price: "KES 950", description: "Half a dozen of mouthwatering spicy chicken wings sautéed in barbeque sauce" },
            { name: "Meat Samosa", price: "KES 450", description: "3 pieces of beef wrapped in filo pastry served with sweet Chilli and a lemon wedge" },
            { name: "Hot Dogs", price: "KES 400", description: "Classic hot dogs" },
            { name: "Choma Sausage (2)", price: "KES 400", description: "Two pieces of choma sausage" },
            { name: "Chips and Sausage", price: "KES 600", description: "French fries served with sausages" },
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
            { name: "Chapati", price: "KES 100", description: "Fresh chapati" },
            { name: "Chips Masala", price: "KES 400", description: "Spiced chips" },
            { name: "French Fries", price: "KES 250", description: "Crispy french fries" },
            { name: "Mayonnaise", price: "KES 170", description: "Fresh mayonnaise" },
            { name: "2 Sausages", price: "KES 260", description: "Two sausages" },
            { name: "French Toast", price: "KES 350", description: "French toast" },
            { name: "Plain Toast", price: "KES 150", description: "Toasted bread" },
            { name: "Plain Rice", price: "KES 300", description: "Steamed rice" },
            { name: "Guacamole", price: "KES 120", description: "Fresh guacamole" },
            { name: "Lyonnaise Potatoes", price: "KES 350", description: "Lyonnaise style potatoes" },
            { name: "Plantains", price: "KES 350", description: "Fried plantains" },
            { name: "Bacon", price: "KES 270", description: "Crispy bacon" },
            { name: "Cheese", price: "KES 200", description: "Fresh cheese" },
            { name: "Nachos", price: "KES 300", description: "Crispy nachos" },
            { name: "Sour Cream", price: "KES 100", description: "Fresh sour cream" },
            { name: "Avocado Flan", price: "KES 150", description: "Fresh avocado" },
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
            { name: "Single Espresso", price: "KES 170", description: "Shot of round strong and flavorful coffee with a sweet after taste" },
            { name: "Double Espresso", price: "KES 230", description: "Double shot of round strong and flavorful coffee with a sweet after taste" },
            { name: "Single House Coffee", price: "KES 200", description: "Black coffee with a balanced taste and flavor" },
            { name: "Double House Coffee", price: "KES 250", description: "Double black coffee with a balanced taste and flavor" },
            { name: "Cappuccino", price: "KES 250", description: "Harmonious balanced cup of sweet rich milk and espresso" },
            { name: "Double Cappuccino", price: "KES 300", description: "Double harmonious balanced cup of sweet rich milk and espresso" },
            { name: "Hazelnut Cappuccino", price: "KES 420", description: "A nutty sweet coffee drink" },
            { name: "Double Hazelnut Cappuccino", price: "KES 480", description: "Double nutty sweet coffee drink" },
            { name: "Espresso Macchiato", price: "KES 200", description: "An exciting delicious multi-layered drink of espresso and milk" },
            { name: "Double Espresso Macchiato", price: "KES 250", description: "Double exciting delicious multi-layered drink of espresso and milk" },
            { name: "Spiced Vanilla Latte", price: "KES 420", description: "Espresso, steamed milk, vanilla syrup and ginger spice" },
            { name: "Double Spiced Vanilla Latte", price: "KES 480", description: "Double espresso, steamed milk, vanilla syrup and ginger spice" },
            { name: "Café Mocha", price: "KES 300", description: "Espresso, steamed milk, chocolate and little froth" },
            { name: "Double Café Mocha", price: "KES 380", description: "Double espresso, steamed milk, chocolate and little froth" },
            { name: "Café Latte", price: "KES 280", description: "Espresso, steamed milk and little smooth froth" },
            { name: "Double Café Latte", price: "KES 320", description: "Double espresso, steamed milk and little smooth froth" },
            { name: "Popcorn Latte", price: "KES 320", description: "Espresso, steamed milk and little smooth froth, finished with popcorn syrup" },
            { name: "Double Popcorn Latte", price: "KES 480", description: "Double espresso, steamed milk and little smooth froth, finished with popcorn syrup" },
            { name: "Café Americano", price: "KES 180", description: "Hot water topped with double shot espresso" },
            { name: "Double Café Americano", price: "KES 230", description: "Hot water topped with double shot espresso" },
          ]
        },
        {
          name: "Iced Coffees",
          items: [
            { name: "Iced Americano", price: "KES 350", description: "Iced coffee with or without milk" },
            { name: "Iced Latte", price: "KES 350", description: "Iced latte with or without milk" },
            { name: "Iced Mocha", price: "KES 380", description: "Iced mocha with or without milk" },
            { name: "Iced Coffee", price: "KES 350", description: "Iced coffee with or without milk" },
            { name: "Iced Cappuccino", price: "KES 350", description: "Iced cappuccino with or without milk" },
            { name: "Iced Flavoured Latte", price: "KES 480", description: "Iced flavoured latte with or without milk" },
          ]
        },
        {
          name: "Classic Teas",
          items: [
            { name: "Single African Tea", price: "KES 200", description: "Milk and tea boiled on the African jiko" },
            { name: "Double African Tea", price: "KES 230", description: "Double milk and tea boiled on the African jiko" },
            { name: "Single English Tea", price: "KES 200", description: "Hot water, served with milk and tea bag a side" },
            { name: "Double English Tea", price: "KES 250", description: "Double hot water, served with milk and tea bag a side" },
            { name: "Single Herbal Teas", price: "KES 250", description: "Pepper mint, chamomile, green tea, raspberry, Hibiscus" },
            { name: "Double Herbal Teas", price: "KES 300", description: "Double pepper mint, chamomile, green tea, raspberry, Hibiscus" },
          ]
        },
        {
          name: "Special Teas & Drinks",
          items: [
            { name: "Single Chai Latte", price: "KES 250", description: "Semi sweet, spicy tea combined with steamed milk" },
            { name: "Double Chai Latte", price: "KES 300", description: "Double semi sweet, spicy tea combined with steamed milk" },
            { name: "Single Glass of Milk", price: "KES 200", description: "Fresh glass of milk" },
            { name: "Double Glass of Milk", price: "KES 250", description: "Double fresh glass of milk" },
            { name: "Lemon Tea", price: "KES 300", description: "Black tea with a hint of lemon juice" },
            { name: "Classic Dawa / Turmeric / Cinnamon", price: "KES 300", description: "Traditional dawa with turmeric and cinnamon" },
            { name: "Cold Chocolate", price: "KES 280", description: "Iced cubes, chocolate syrup and milk" },
            { name: "Double Cold Chocolate", price: "KES 350", description: "Double iced cubes, chocolate syrup and milk" },
            { name: "Iced Lemonade", price: "KES 220", description: "Ice cubes, mineral water and lemon juice" },
            { name: "Double Iced Lemonade", price: "KES 300", description: "Double ice cubes, mineral water and lemon juice" },
            { name: "Iced Lemon and Ginger (Dawa)", price: "KES 350", description: "Ice cubes, mineral water, ginger, and honey" },
            { name: "Iced Flavoured Tea", price: "KES 350", description: "Ice cubes, mineral water and your choice of herbal tea" },
            { name: "Strawberry Lemonade", price: "KES 450", description: "Fresh strawberries blended with ice cubes and lemon juice" },
            { name: "Iced Hibiscus Tea", price: "KES 450", description: "Iced hibiscus tea" },
          ]
        },
        {
          name: "Smoothies",
          items: [
            { name: "Single Banana Smoothie", price: "KES 250", description: "Banana, Yoghurt, ice" },
            { name: "Double Banana Smoothie", price: "KES 400", description: "Double banana, Yoghurt, ice" },
            { name: "Single Mango Smoothie", price: "KES 200", description: "Mango, Yoghurt, ice" },
            { name: "Double Mango Smoothie", price: "KES 380", description: "Double mango, Yoghurt, ice" },
            { name: "Single Avocado and Mango Smoothie", price: "KES 200", description: "Avocado, mango, Yoghurt, ice" },
            { name: "Double Avocado and Mango Smoothie", price: "KES 380", description: "Double avocado, mango, Yoghurt, ice" },
            { name: "Single Beetroot and Papaya", price: "KES 200", description: "Beetroot, papaya, Yoghurt, ice" },
            { name: "Double Beetroot and Papaya", price: "KES 380", description: "Double beetroot, papaya, Yoghurt, ice" },
            { name: "Single Pete's Smoothie", price: "KES 450", description: "Strawberry, Mango, Papaya and Yoghurt" },
            { name: "Double Pete's Smoothie", price: "KES 500", description: "Double strawberry, Mango, Papaya and Yoghurt" },
            { name: "Single Tropical", price: "KES 450", description: "Tropical smoothie" },
            { name: "Double Tropical", price: "KES 500", description: "Double tropical smoothie" },
            { name: "Single Pineapple and Mint Passion", price: "KES 450", description: "Pineapple and mint passion smoothie" },
            { name: "Double Pineapple and Mint Passion", price: "KES 500", description: "Double pineapple and mint passion smoothie" },
            { name: "Single Fresh Lemonade", price: "KES 450", description: "Fresh lemonade" },
            { name: "Double Fresh Lemonade", price: "KES 500", description: "Double fresh lemonade" },
            { name: "Single Mango Minty", price: "KES 450", description: "Mango minty smoothie" },
            { name: "Double Mango Minty", price: "KES 500", description: "Double mango minty smoothie" },
          ]
        },
        {
          name: "Soft Drinks",
          items: [
            { name: "Sodas", price: "KES 180", description: "Various soft drinks" },
            { name: "Diet Coke", price: "KES 200", description: "Diet coke" },
            { name: "Mineral Water 500 ML", price: "KES 170", description: "500 ml mineral water" },
            { name: "Mineral Water 1 LTR", price: "KES 250", description: "1 litre mineral water" },
            { name: "Sparkling Water 500 ML", price: "KES 250", description: "500 ml sparkling water" },
            { name: "Sparkling Water 1 LTR", price: "KES 350", description: "1 litre sparkling water" },
          ]
        },
        {
          name: "Mocktails",
          items: [
            { name: "Strawberry Mojito", price: "KES 450", description: "Strawberry mojito mocktail" },
            { name: "Passion Mojito", price: "KES 450", description: "Passion fruit mojito mocktail" },
            { name: "Kiwi Mojito", price: "KES 450", description: "Kiwi mojito mocktail" },
          ]
        },
        {
          name: "Shakes",
          items: [
            { name: "Fudge Shake", price: "KES 520", description: "Chocolate ice cream, brownies and milk" },
            { name: "Vanilla Shake", price: "KES 450", description: "Vanilla ice cream and milk" },
            { name: "Mango Shake", price: "KES 490", description: "Mango ice cream and milk" },
            { name: "Funky Nut Shake", price: "KES 520", description: "Vanilla ice cream, peanuts and milk" },
            { name: "Chocolate Shake", price: "KES 490", description: "Chocolate ice cream and milk" },
            { name: "Blueberry Shake", price: "KES 520", description: "Blueberry ice cream and milk" },
            { name: "Espresso Shake", price: "KES 490", description: "Espresso, vanilla ice cream and milk" },
            { name: "Mocha Shake", price: "KES 520", description: "Vanilla ice cream, chocolate, coffee granules and milk" },
            { name: "Mixed Fruit Shake", price: "KES 520", description: "Banana, mango, blueberry-cherries, beetroot, vanilla ice cream and milk" },
            { name: "Strawberry Shake", price: "KES 490", description: "Strawberry ice cream and milk" },
            { name: "Banana Shake", price: "KES 490", description: "Banana, vanilla ice cream and milk" },
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
