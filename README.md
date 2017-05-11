# MySQLBamazon
Application using Node.js and MySQL to take store inventory and deplete stock

##Directions
Using **MySQL** and **node.js** and **cli-table** I was able to integrate an application that when running terminal allows me to see my inventory in a nice table and add to it, purchase items, add new products, and update pricing.

###Customer view

When running the program as a customer the main focus is to view the table and select what items you need like at a grocery store. So when you run it it should show you:
* A layout of the table
* Then ask which item by its unique id would you like
* Then how many of that item 
* After you make your selection it will update the stock of the item in real time to reflect actual inventory

###Manager View 

When running the program as a manager, the main focus is viewing what you currently have in the table and being able to add products or more stock of an item. When you run the manager function it should ask
* if you want to view
* do you want to add a product 
	* if so, what is the name, department, price and how much of it. 
* If you want to add stock it will ask how many of a item you select do you want to add. 
* I also added an exit command if you want to get out of this function

###MySQL

I have a schema file that created a database and a table and I added to the table within MySQL. I also can add new things to my table with javascript using the npm package of mysql commands.