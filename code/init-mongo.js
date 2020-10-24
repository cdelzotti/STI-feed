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