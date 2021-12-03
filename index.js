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
/*app.get("/store/:storeId/inventory/film", function(req, res, next){
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
});Sacar peliculas de una tienda por id de la tienda*/

app.get("/store/:country/inventory/film", function(req, res, next){
    const par = req.query.name_film
    if(par){
        console.log("parametro name_film")
        const sql = "SELECT DISTINCT inventory.store_id, film.title "+
                    "FROM inventory "+
                    "INNER JOIN film "+
                        "ON film.film_id = inventory.film_id "+
                        "INNER JOIN store "+
                            "ON store.store_id = inventory.store_id "+
                            "INNER JOIN address "+
                                "ON address.address_id = store.address_id "+
                                "INNER JOIN city "+
                                    "ON address.city_id = city.city_id "+
                                    "INNER JOIN country "+
                                        "ON country.country_id = city.country_id "+
                    "WHERE film.title LIKE '%"+req.query.name_film+"%' "+
                    "AND country.country = '"+req.params.country+"' "+
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
                                "INNER JOIN store "+
                                    "ON store.store_id = inventory.store_id "+
                                    "INNER JOIN address "+
                                        "ON address.address_id = store.address_id "+
                                        "INNER JOIN city "+
                                            "ON address.city_id = city.city_id "+
                                            "INNER JOIN country "+
                                                "ON country.country_id = city.country_id "+                                
                        "WHERE country.country = '"+req.params.country+"' "+
                        "AND actor.first_name LIKE '%"+req.query.name_actor+"%' "+
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
                            "INNER JOIN store "+
                                "ON store.store_id = inventory.store_id "+
                                "INNER JOIN address "+
                                    "ON address.address_id = store.address_id "+
                                    "INNER JOIN city "+
                                        "ON address.city_id = city.city_id "+
                                        "INNER JOIN country "+
                                            "ON country.country_id = city.country_id "+
                        "WHERE country.country = '"+req.params.country+"' "+
                        "LIMIT 10";
            conn.query(sql, function (err, result){
                if (err) throw err;
                res.json(result);
            });
        }
    }
});
app.get("/store/:country/inventory/film/new", function(req, res, next){
    const sql = "SELECT DISTINCT film.* "+
                "FROM inventory "+
                "INNER JOIN film "+
                    "ON film.film_id = inventory.film_id "+
                    "INNER JOIN store "+
                        "ON store.store_id = inventory.store_id "+
                        "INNER JOIN address "+
                            "ON address.address_id = store.address_id "+
                            "INNER JOIN city "+
                                "ON address.city_id = city.city_id "+
                                "INNER JOIN country "+
                                    "ON country.country_id = city.country_id "+
                "WHERE country.country = '"+req.params.country+"' "+
                "AND film.last_update = ( "+
                    "SELECT MAX(last_update) "+
                    "FROM film) "+
                "LIMIT 10";
    conn.query(sql, function (err, result){
    if (err) throw err;
    res.json(result);
    });
});

app.get("/store/:country/inventory/film/category/:category", function(req, res, next){
    const sql = "SELECT DISTINCT film.* "+
                "FROM inventory "+
                "INNER JOIN film "+
                    "ON film.film_id = inventory.film_id "+
                    "INNER JOIN store "+
                        "ON store.store_id = inventory.store_id "+
                        "INNER JOIN address "+
                            "ON address.address_id = store.address_id "+
                            "INNER JOIN city "+
                                "ON address.city_id = city.city_id "+
                                "INNER JOIN country "+
                                    "ON country.country_id = city.country_id "+
                    "INNER JOIN film_category "+
                        "ON film_category.film_id = film.film_id "+
                        "INNER JOIN category "+
                            "ON category.category_id = film_category.category_id "+ 
                "WHERE country.country = '"+req.params.country+"' "+
                "AND category.name = '"+req.params.category+"' "+
                "ORDER BY rand() "+
                "LIMIT 10";
    conn.query(sql, function (err, result){
    if (err) throw err;
    res.json(result);
    });
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

app.get("/store/:country/city", function(req, res, next){
    const sql = "SELECT country.country, city.city_id, city.city "+
                "FROM city "+
                "INNER JOIN country "+
                    "ON city.country_id = country.country_id "+
                "WHERE country.country = '"+req.params.country+"'";
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });    
});


app.post("/store/:storeid/customer", jsonParser, (req, res, next) => {
    aux=req.body
    const sql = "INSERT INTO customer  (customer_id, store_id, first_name, last_name, address_id, active, create_date, last_update) "+
                "VALUES (null , '"+aux.store_id+"', '"+aux.first_name+"', '"+aux.last_name+"', '"+aux.adress_id+"', '"+aux.active+"', '"+aux.create_date+"', '"+aux.last_update+"')"
    console.log("El sql: "+sql)
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

app.post("/store/:storeid/address", jsonParser, (req, res, next) => {
    aux=req.body
    const sql = "INSERT INTO address (address_id, address, address2, district, city_id, postal_code, phone, last_update, location) "+
                "VALUES (null, '"+aux.address+"', '"+aux.address2+"', '"+aux.district+"', '"+aux.city_id+"', '"+aux.postal_code+"', '"+aux.phone+"', '"+aux.last_update+"', ST_PointFromText('POINT ("+aux.location[0].x+" "+aux.location[0].y+")'))"
    console.log("El sql: "+sql)
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});


app.get("/store/:country", function(req, res, next){
    const sql = "SELECT store.store_id, country.country_id, country.country " +
                "FROM store "+
                "INNER JOIN address "+
                    "ON address.address_id = store.address_id "+
                    "INNER JOIN city "+
                        "ON address.city_id = city.city_id "+
                        "INNER JOIN country "+
                        "ON country.country_id = city.country_id "+
                "WHERE country.country = '"+req.params.country+"'";
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

app.get("/address", function(req, res, next){
    const sql = "SELECT * FROM address ORDER BY address.address_id DESC LIMIT 10"
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

app.get("/film/:filmId", function(req, res, next){
    const sql =" SELECT film.film_id, film.title "+ 
                "FROM film "+
                "WHERE film.film_id = "+req.params.filmId+" "+
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

app.post("/store/:storeid/customer/:customerId/rental", jsonParser, (req, res, next) => {
    aux=req.body
    const sql = "INSERT INTO rental (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update) "+
                "VALUES (null, '"+aux.rental_date+"', '"+aux.inventory_id+"', '"+req.params.customerId+"', '"+aux.return_date+"', '"+aux.staff_id+"', '"+aux.last_update+")"
    console.log("El sql: "+sql)
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

app.post("/store/:storeid/customer/:customerId/payment", jsonParser, (req, res, next) => {
    aux=req.body
    const sql = "INSERT INTO payment (payment_id, customer_id, staff_id, rental_id, amount, payment_date, last_update) "+
                "VALUES (null, '"+req.params.customerId+"', '"+aux.staff_id+"', '"+aux.rental_id+"', '"+aux.amount+"', '"+aux.payment_date+"', '"+aux.last_update+")"
    console.log("El sql: "+sql)
    conn.query(sql, function (err, result){
        if (err) throw err;
        res.json(result);
    });
});





/*INSERT INTO rental (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update)
VALUES ('524', '2021-09-25 22:32:31', '1', '1', '2021-11-25 22:32:31', '10', '2021-09-25 22:32:31')*/

/*INSERT INTO payment (payment_id, customer_id, staff_id, rental_id, amount, payment_date, last_update)
VALUES ('524', '5', '10', '524', '250', '2021-09-25 22:32:31', '2021-09-25 22:32:31')*/



