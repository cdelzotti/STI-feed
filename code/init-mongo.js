db.createUser(
    {
        user : "stiuser",
        pwd : "root",
        roles : [
            {
                role : "readWrite",
                db : "stifeed"
            }
        ]
    }
)

db = new Mongo().getDB("stifeed");

db.createCollection('Users', { capped: false });

db.Users.insert([{
    username : "admin",
    password : "sti-feed"
    }]);