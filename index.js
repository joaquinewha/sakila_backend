var express = require("express");
var bodyParser = require('body-parser');
var mysql = require("mysql");

var jsonParser = bodyParser.json()

var app = express();

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    port: 3333,
    database: "sakila"
});

conn.connect(
    function(err){
    if (err) throw err;
    console.log("Connected");
});

app.listen(3000, ()=>{
    console.log("Servidor http funcionando");
});

app.get("/", (req, res, next) => {
    res.send("Server running");
});

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        res.status(200).json({});
    }
    next();
});

//Store
app.get("/store", function(req, res, next){
    const sql = "SELECT * "+
                "FROM store "+
                "INNER JOIN address "+
                    "ON address.address_id = store.address_id "+
                    "INNER JOIN city "+
                        "ON address.city_id = city.city_id "+
                        "INNER JOIN country "+
                            "ON country.country_id = city.country_id "+
                "LIMIT 10 ";
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

//Film
app.get("/store/:storeId/inventory/film", function(req, res, next){
    const par = req.query.name_film
    if(par){
        console.log("parametro name_film")
        const sql = "SELECT DISTINCT inventory.store_id, film.title "+
                    "FROM inventory "+
                    "INNER JOIN film "+
                        "ON film.film_id = inventory.film_id "+
                    "WHERE film.title LIKE '%"+req.query.name_film+"%' "+
                    "AND store_id = "+ Number(req.params.storeId) +" "+
                    "LIMIT 10 ";
        conn.query(sql, function (err, result){
            if (err) throw err;
            res.json(result);
        });
    }
    else{
        const par = req.query.name_actor
        if(par){
            console.log("parametro name_actor")
            const sql = "SELECT DISTINCT film.title, actor.first_name, actor.last_name "+
                        "FROM inventory "+
                            "INNER JOIN film "+
                                "ON film.film_id = inventory.film_id "+
                                "INNER JOIN film_actor "+
                                    "ON film.film_id = film_actor.film_id "+
                                    "INNER JOIN actor "+
                                        "ON actor.actor_id = film_actor.actor_id "+
                                            "WHERE inventory.store_id = "+ Number(req.params.storeId) +" "+
                                            "AND (actor.first_name LIKE '%"+req.query.name_actor+"%' "+
                                            "OR actor.last_name LIKE '%"+req.query.name_actor+"%') "+
                                            "LIMIT 10 ";
            conn.query(sql, function (err, result){
                if (err) throw err;
                res.json(result);
            });

        }
        else{
            const sql = "SELECT DISTINCT film.* "+
                        "FROM inventory "+
                        "INNER JOIN film "+
                            "ON film.film_id = inventory.film_id "+
                        "WHERE inventory.store_id = "+ Number(req.params.storeId) +" "+
                        "LIMIT 10 ";
            conn.query(sql, function (err, result){
                if (err) throw err;
                res.json(result);
            });
        }
    }
});

//Custumer
app.get("/store/:storeId/custumer/:customerId", function(req, res, next){
    console.log("StoreID: "+Number(req.params.storeId))
    console.log("CustomerID: "+Number(req.params.customerId))
    const sql = "SELECT customer.*, address.* "+
                "FROM customer "+
                "INNER JOIN address "+
                    "ON customer.address_id = address.address_id "+
                "WHERE customer.store_id = "+ Number(req.params.storeId)+" "+
                "AND customer.customer_id = "+ Number(req.params.customerId);
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });    
});

app.put('/store/:storeId/custumer/:customerId', jsonParser, function(req, res){
    aux=req.body
    parametro = "address"
    res.json(UpdateCustomer(parametro,aux.address,Number(req.params.customerId),Number(req.params.storeId)));
});
function UpdateCustomer(parametro, variable, customerId, storeId){
    const sql = "UPDATE address "+
                "INNER JOIN customer "+
                    "ON customer.address_id = address.address_id "+
                "SET "+parametro+" = '"+variable+"' "+
                "WHERE customer.customer_id = "+ customerId+" "+
                "AND customer.store_id = "+ storeId;
    conn.query(sql, function (err, result){
    if (err){
        return ("Se actualizo correctamente "+result); 
    }else{
        return("No se Pudo actualizar "+err)
    }    
    });
}

app.post("/store/:storeId/customer", jsonParser, (req, res, next) => {
    aux=req.body
    console.log("StoreID: "+Number(req.params.storeId))
    console.log("CustomerID: "+Number(req.params.customerId))
    customer_id = 604
    const sql = "INSERT INTO customer (customer_id, store_id, first_name, last_name, address_id, active, create_date, last_update) "+
                "VALUES ('"+customer_id+"', '"+req.params.storeId+"', '"+aux.first_name+"', '"+aux.last_name+"', '603', '"+aux.active+"', '"+aux.create_date+"', '"+aux.last_update+"')"
    console.log("El sql: "+sql)
    /*conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });  */
});

/*INSERT INTO address (address_id, address, address2, district, city_id, postal_code, phone, last_update, location)
VALUES ('604', '225 AV Lupoez', '', 'QLSD', '300', '1010', '25648756', '2014-09-25 22:32:43', 'POINT (153.1913094 -27.6333373)')*/

/*INSERT INTO customer  (customer_id, store_id, first_name, last_name, address_id, active, create_date, last_update)
VALUES ('600', '2', 'GEL', 'PEPE', '603', '0', '2021-09-25 22:32:31', '2021-09-25 22:32:43')*/

// Rental
app.post("/store/:storeId/customer", jsonParser, (req, res, next) => {
    aux=req.body
    console.log("StoreID: "+Number(req.params.storeId))
    console.log("CustomerID: "+Number(req.params.customerId))
    customer_id = 604
    const sql = "INSERT INTO customer (customer_id, store_id, first_name, last_name, address_id, active, create_date, last_update) "+
                "VALUES ('"+customer_id+"', '"+req.params.storeId+"', '"+aux.first_name+"', '"+aux.last_name+"', '603', '"+aux.active+"', '"+aux.create_date+"', '"+aux.last_update+"')"
    console.log("El sql: "+sql)
    /*conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });  */
});


/*INSERT INTO rental (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update)
VALUES ('524', '2021-09-25 22:32:31', '1', '1', '2021-11-25 22:32:31', '10', '2021-09-25 22:32:31')*/

/*INSERT INTO payment (payment_id, customer_id, staff_id, rental_id, amount, payment_date, last_update)
VALUES ('524', '5', '10', '524', '250', '2021-09-25 22:32:31', '2021-09-25 22:32:31')*/
