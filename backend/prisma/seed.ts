import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: '[chef@recipes.com](mailto:chef@recipes.com)' },
    update: {},
create: {
name: "Chef Maria",
email: "[chef@recipes.com](mailto:chef@recipes.com)",
passwordHash
}
})

const data = {


Breakfast: [
  { title:"Buttermilk Pancakes", description:"Mix flour, sugar, baking powder and salt. Whisk buttermilk, eggs and melted butter separately. Combine both mixtures until smooth. Cook batter on a hot buttered pan until bubbles form, flip and cook until golden.", ingredients:[{name:"Flour",quantity:"1 cup"},{name:"Buttermilk",quantity:"1 cup"},{name:"Egg",quantity:"1"}] },
  { title:"Classic French Toast", description:"Beat eggs with milk, cinnamon and vanilla. Dip bread slices into mixture and cook on buttered skillet until golden brown. Serve with maple syrup.", ingredients:[{name:"Bread",quantity:"4 slices"},{name:"Eggs",quantity:"2"},{name:"Milk",quantity:"1/2 cup"}] },
  { title:"Avocado Egg Toast", description:"Toast sourdough bread. Mash avocado with lemon juice and salt. Spread on toast and top with a poached egg and chili flakes.", ingredients:[{name:"Bread",quantity:"2 slices"},{name:"Avocado",quantity:"1"},{name:"Egg",quantity:"1"}] },
  { title:"Banana Oatmeal", description:"Cook oats in milk over medium heat while stirring. Add mashed banana and honey. Cook until creamy and serve warm.", ingredients:[{name:"Oats",quantity:"1/2 cup"},{name:"Milk",quantity:"1 cup"},{name:"Banana",quantity:"1"}] },
  { title:"Spinach Omelette", description:"Whisk eggs with salt and pepper. Cook in skillet and add spinach and onions. Fold and cook until eggs set.", ingredients:[{name:"Eggs",quantity:"3"},{name:"Spinach",quantity:"1/4 cup"},{name:"Onion",quantity:"2 tbsp"}] },
  { title:"Breakfast Burrito", description:"Scramble eggs with onions and peppers. Fill warm tortilla with eggs, cheese and salsa. Roll tightly and toast lightly.", ingredients:[{name:"Eggs",quantity:"2"},{name:"Tortilla",quantity:"1"},{name:"Cheese",quantity:"1/4 cup"}] },
  { title:"Greek Yogurt Parfait", description:"Layer yogurt with granola and berries in a glass. Repeat layers and drizzle honey before serving.", ingredients:[{name:"Greek yogurt",quantity:"1 cup"},{name:"Granola",quantity:"1/2 cup"},{name:"Berries",quantity:"1/4 cup"}] },
  { title:"Peanut Butter Banana Toast", description:"Toast bread slices. Spread peanut butter and top with sliced bananas and honey.", ingredients:[{name:"Bread",quantity:"2 slices"},{name:"Peanut butter",quantity:"2 tbsp"},{name:"Banana",quantity:"1"}] },
  { title:"Egg Muffins", description:"Mix eggs, diced vegetables and cheese. Pour into muffin tin and bake at 180°C for 15 minutes.", ingredients:[{name:"Eggs",quantity:"4"},{name:"Bell pepper",quantity:"1/4 cup"},{name:"Cheese",quantity:"1/4 cup"}] },
  { title:"Classic Porridge", description:"Simmer oats in milk while stirring continuously. Add sugar and cook until thick and creamy.", ingredients:[{name:"Oats",quantity:"1/2 cup"},{name:"Milk",quantity:"1 cup"},{name:"Sugar",quantity:"1 tbsp"}] }
],

Lunch: [
  { title:"Chicken Caesar Salad", description:"Grill seasoned chicken breast and slice. Toss romaine lettuce with Caesar dressing, croutons and parmesan. Top with chicken.", ingredients:[{name:"Chicken breast",quantity:"1"},{name:"Romaine lettuce",quantity:"1 cup"},{name:"Parmesan",quantity:"2 tbsp"}] },
  { title:"Grilled Cheese Sandwich", description:"Butter two bread slices. Add cheddar cheese between them and grill until bread is golden and cheese melts.", ingredients:[{name:"Bread",quantity:"2 slices"},{name:"Cheddar",quantity:"2 slices"},{name:"Butter",quantity:"1 tbsp"}] },
  { title:"Vegetable Fried Rice", description:"Stir fry garlic, vegetables and cooked rice in soy sauce and sesame oil until heated through.", ingredients:[{name:"Cooked rice",quantity:"1 cup"},{name:"Carrot",quantity:"1/4 cup"},{name:"Soy sauce",quantity:"1 tbsp"}] },
  { title:"Chicken Wrap", description:"Fill tortilla with grilled chicken, lettuce, tomato and yogurt sauce. Roll tightly and slice.", ingredients:[{name:"Tortilla",quantity:"1"},{name:"Chicken",quantity:"100g"},{name:"Lettuce",quantity:"1/4 cup"}] },
  { title:"Tomato Basil Pasta", description:"Cook pasta. Simmer tomatoes, garlic and olive oil into sauce. Toss pasta with basil and parmesan.", ingredients:[{name:"Pasta",quantity:"1 cup"},{name:"Tomato",quantity:"2"},{name:"Basil",quantity:"2 tbsp"}] },
  { title:"Quinoa Salad", description:"Mix cooked quinoa with cucumber, tomato, lemon juice and olive oil.", ingredients:[{name:"Quinoa",quantity:"1 cup"},{name:"Cucumber",quantity:"1/2"},{name:"Tomato",quantity:"1"}] },
  { title:"Chicken Noodle Soup", description:"Simmer chicken, carrots, celery and noodles in broth until vegetables are tender.", ingredients:[{name:"Chicken",quantity:"100g"},{name:"Noodles",quantity:"1/2 cup"},{name:"Carrot",quantity:"1"}] },
  { title:"Veggie Burger", description:"Grill vegetable patty and assemble with lettuce, tomato and burger bun.", ingredients:[{name:"Burger bun",quantity:"1"},{name:"Veg patty",quantity:"1"},{name:"Tomato",quantity:"2 slices"}] },
  { title:"Tuna Sandwich", description:"Mix tuna with mayo and lemon juice. Spread on bread with lettuce.", ingredients:[{name:"Tuna",quantity:"1/2 cup"},{name:"Bread",quantity:"2 slices"},{name:"Mayo",quantity:"1 tbsp"}] },
  { title:"Greek Salad", description:"Combine cucumber, tomato, olives and feta. Toss with olive oil and oregano.", ingredients:[{name:"Cucumber",quantity:"1/2"},{name:"Feta",quantity:"1/4 cup"},{name:"Olives",quantity:"2 tbsp"}] }
],

Dinner: [
  { title:"Spaghetti Bolognese", description:"Cook minced beef with onion and garlic. Add tomato sauce and simmer. Toss with cooked spaghetti.", ingredients:[{name:"Spaghetti",quantity:"1 cup"},{name:"Minced beef",quantity:"100g"},{name:"Tomato sauce",quantity:"1 cup"}] },
  { title:"Butter Chicken", description:"Marinate chicken in yogurt and spices. Cook in tomato butter sauce until tender.", ingredients:[{name:"Chicken",quantity:"200g"},{name:"Tomato puree",quantity:"1 cup"},{name:"Butter",quantity:"2 tbsp"}] },
  { title:"Vegetable Stir Fry", description:"Stir fry mixed vegetables in sesame oil with soy sauce until crisp.", ingredients:[{name:"Broccoli",quantity:"1/2 cup"},{name:"Carrot",quantity:"1/4 cup"},{name:"Soy sauce",quantity:"1 tbsp"}] },
  { title:"Beef Tacos", description:"Cook ground beef with taco seasoning. Fill tortillas with beef, lettuce and salsa.", ingredients:[{name:"Ground beef",quantity:"150g"},{name:"Taco shell",quantity:"2"},{name:"Lettuce",quantity:"1/4 cup"}] },
  { title:"Chicken Alfredo Pasta", description:"Cook pasta and toss with cream, garlic and parmesan sauce with grilled chicken.", ingredients:[{name:"Pasta",quantity:"1 cup"},{name:"Chicken",quantity:"100g"},{name:"Cream",quantity:"1/2 cup"}] },
  { title:"Shrimp Fried Rice", description:"Stir fry shrimp with rice, eggs and vegetables with soy sauce.", ingredients:[{name:"Shrimp",quantity:"100g"},{name:"Rice",quantity:"1 cup"},{name:"Egg",quantity:"1"}] },
  { title:"Mushroom Risotto", description:"Cook arborio rice slowly with broth, mushrooms and parmesan until creamy.", ingredients:[{name:"Arborio rice",quantity:"1 cup"},{name:"Mushroom",quantity:"1/2 cup"},{name:"Parmesan",quantity:"2 tbsp"}] },
  { title:"Baked Salmon", description:"Season salmon with lemon, garlic and herbs and bake at 180°C for 15 minutes.", ingredients:[{name:"Salmon",quantity:"200g"},{name:"Lemon",quantity:"1"},{name:"Garlic",quantity:"2 cloves"}] },
  { title:"Paneer Tikka Masala", description:"Grill paneer cubes and simmer in tomato cream curry sauce.", ingredients:[{name:"Paneer",quantity:"200g"},{name:"Tomato",quantity:"2"},{name:"Cream",quantity:"1/4 cup"}] },
  { title:"Roast Chicken", description:"Season whole chicken with herbs and roast in oven until golden.", ingredients:[{name:"Chicken",quantity:"1"},{name:"Garlic",quantity:"3 cloves"},{name:"Olive oil",quantity:"2 tbsp"}] }
],

Dessert: [
  { title:"Chocolate Brownies", description:"Mix cocoa, flour, sugar and eggs. Bake batter at 180°C for 25 minutes until fudgy.", ingredients:[{name:"Cocoa powder",quantity:"1/2 cup"},{name:"Flour",quantity:"1 cup"},{name:"Egg",quantity:"2"}] },
  { title:"Vanilla Cupcakes", description:"Beat butter and sugar. Add eggs and flour. Bake batter in cupcake tins for 20 minutes.", ingredients:[{name:"Flour",quantity:"1 cup"},{name:"Sugar",quantity:"1 cup"},{name:"Egg",quantity:"2"}] },
  { title:"Apple Pie", description:"Fill pie crust with cinnamon apples and bake until crust is golden.", ingredients:[{name:"Apple",quantity:"3"},{name:"Sugar",quantity:"1/2 cup"},{name:"Pie crust",quantity:"1"}] },
  { title:"Cheesecake", description:"Blend cream cheese, sugar and eggs. Bake on biscuit crust until set.", ingredients:[{name:"Cream cheese",quantity:"200g"},{name:"Sugar",quantity:"1/2 cup"},{name:"Egg",quantity:"2"}] },
  { title:"Chocolate Lava Cake", description:"Bake chocolate batter briefly so center stays molten.", ingredients:[{name:"Chocolate",quantity:"100g"},{name:"Butter",quantity:"50g"},{name:"Egg",quantity:"2"}] },
  { title:"Banana Bread", description:"Mix mashed bananas with flour, sugar and eggs. Bake loaf until firm.", ingredients:[{name:"Banana",quantity:"3"},{name:"Flour",quantity:"1.5 cups"},{name:"Egg",quantity:"2"}] },
  { title:"Strawberry Shortcake", description:"Layer biscuits with strawberries and whipped cream.", ingredients:[{name:"Strawberries",quantity:"1 cup"},{name:"Cream",quantity:"1/2 cup"},{name:"Biscuits",quantity:"2"}] },
  { title:"Ice Cream Sundae", description:"Top vanilla ice cream with chocolate syrup, nuts and cherries.", ingredients:[{name:"Ice cream",quantity:"2 scoops"},{name:"Chocolate syrup",quantity:"2 tbsp"},{name:"Nuts",quantity:"1 tbsp"}] },
  { title:"Chocolate Chip Cookies", description:"Mix butter, sugar, flour and chocolate chips. Bake until golden.", ingredients:[{name:"Flour",quantity:"1 cup"},{name:"Butter",quantity:"1/2 cup"},{name:"Chocolate chips",quantity:"1/2 cup"}] },
  { title:"Tiramisu", description:"Layer espresso soaked ladyfingers with mascarpone cream and cocoa.", ingredients:[{name:"Ladyfingers",quantity:"10"},{name:"Mascarpone",quantity:"200g"},{name:"Coffee",quantity:"1 cup"}] }
],

Snack: [
  { title:"Loaded Nachos", description:"Bake tortilla chips with cheese, beans and jalapeños until melted.", ingredients:[{name:"Tortilla chips",quantity:"1 cup"},{name:"Cheese",quantity:"1/2 cup"},{name:"Beans",quantity:"1/4 cup"}] },
  { title:"Garlic Bread", description:"Spread garlic butter on bread and bake until crisp.", ingredients:[{name:"Bread",quantity:"4 slices"},{name:"Butter",quantity:"2 tbsp"},{name:"Garlic",quantity:"2 cloves"}] },
  { title:"Veg Spring Rolls", description:"Fill wrappers with vegetables and fry until crispy.", ingredients:[{name:"Spring roll wrapper",quantity:"6"},{name:"Cabbage",quantity:"1/2 cup"},{name:"Carrot",quantity:"1/4 cup"}] },
  { title:"Chicken Nuggets", description:"Coat chicken pieces in breadcrumbs and fry until golden.", ingredients:[{name:"Chicken",quantity:"200g"},{name:"Breadcrumbs",quantity:"1 cup"},{name:"Egg",quantity:"1"}] },
  { title:"Popcorn", description:"Heat kernels in oil until they pop. Season with salt.", ingredients:[{name:"Popcorn kernels",quantity:"1/2 cup"},{name:"Oil",quantity:"1 tbsp"},{name:"Salt",quantity:"1 tsp"}] },
  { title:"Fruit Chaat", description:"Mix chopped fruits with lemon juice and chaat masala.", ingredients:[{name:"Apple",quantity:"1"},{name:"Banana",quantity:"1"},{name:"Orange",quantity:"1"}] },
  { title:"Cheese Balls", description:"Mix cheese with breadcrumbs, form balls and fry until crispy.", ingredients:[{name:"Cheese",quantity:"1 cup"},{name:"Breadcrumbs",quantity:"1 cup"},{name:"Egg",quantity:"1"}] },
  { title:"Roasted Chickpeas", description:"Roast seasoned chickpeas in oven until crunchy.", ingredients:[{name:"Chickpeas",quantity:"1 cup"},{name:"Olive oil",quantity:"1 tbsp"},{name:"Paprika",quantity:"1 tsp"}] },
  { title:"Hummus with Pita", description:"Blend chickpeas, tahini, garlic and lemon juice into creamy dip.", ingredients:[{name:"Chickpeas",quantity:"1 cup"},{name:"Tahini",quantity:"2 tbsp"},{name:"Garlic",quantity:"1 clove"}] },
  { title:"Potato Wedges", description:"Bake seasoned potato wedges until crispy.", ingredients:[{name:"Potato",quantity:"2"},{name:"Olive oil",quantity:"1 tbsp"},{name:"Salt",quantity:"1 tsp"}] }
],

Drink: [
  { title:"Mango Smoothie", description:"Blend mango with yogurt, milk and honey until smooth.", ingredients:[{name:"Mango",quantity:"1 cup"},{name:"Yogurt",quantity:"1/2 cup"},{name:"Milk",quantity:"1/2 cup"}] },
  { title:"Strawberry Milkshake", description:"Blend strawberries, milk and ice cream until creamy.", ingredients:[{name:"Strawberries",quantity:"1 cup"},{name:"Milk",quantity:"1 cup"},{name:"Ice cream",quantity:"1 scoop"}] },
  { title:"Lemon Iced Tea", description:"Brew tea and chill. Add lemon juice and sugar before serving.", ingredients:[{name:"Tea",quantity:"1 cup"},{name:"Lemon",quantity:"1"},{name:"Sugar",quantity:"1 tbsp"}] },
  { title:"Cold Coffee", description:"Blend chilled coffee with milk, sugar and ice.", ingredients:[{name:"Coffee",quantity:"1 cup"},{name:"Milk",quantity:"1 cup"},{name:"Sugar",quantity:"1 tbsp"}] },
  { title:"Green Smoothie", description:"Blend spinach, banana and apple juice until smooth.", ingredients:[{name:"Spinach",quantity:"1 cup"},{name:"Banana",quantity:"1"},{name:"Apple juice",quantity:"1 cup"}] },
  { title:"Orange Juice", description:"Freshly squeeze oranges and chill before serving.", ingredients:[{name:"Orange",quantity:"3"}] },
  { title:"Chocolate Milkshake", description:"Blend milk, chocolate syrup and ice cream.", ingredients:[{name:"Milk",quantity:"1 cup"},{name:"Chocolate syrup",quantity:"2 tbsp"},{name:"Ice cream",quantity:"1 scoop"}] },
  { title:"Banana Shake", description:"Blend bananas with milk and honey until smooth.", ingredients:[{name:"Banana",quantity:"2"},{name:"Milk",quantity:"1 cup"},{name:"Honey",quantity:"1 tbsp"}] },
  { title:"Mint Lemonade", description:"Blend lemon juice, mint leaves, sugar and water. Serve chilled.", ingredients:[{name:"Lemon",quantity:"2"},{name:"Mint",quantity:"1 tbsp"},{name:"Sugar",quantity:"1 tbsp"}] },
  { title:"Iced Latte", description:"Pour espresso over ice and add chilled milk.", ingredients:[{name:"Espresso",quantity:"1 shot"},{name:"Milk",quantity:"1 cup"}] }
],


};

for (const [categoryName, recipes] of Object.entries(data)) {

const category = await prisma.category.upsert({
  where: { name: categoryName },
  update: {},
  create: { name: categoryName }
});

for (const recipe of recipes) {

  await prisma.recipe.create({
    data: {
      title: recipe.title,
      description: recipe.description,
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: user.id,
      categoryId: category.id,
          ingredients: { create: recipe.ingredients },
    },
  });

    }

    console.log(`✅ 10 recipes added for ${categoryName}`);
  }

  console.log('🎉 60 real recipes seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
