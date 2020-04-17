const DAO = require('../../lib/dao')
const mySQLWrapper = require('../../lib/mysqlWrapper')

class User extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'users'
    }

    /**
     * Returns a user by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /**
     * Returns a list of users matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all users if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll()
        
        // Find matching users
        return this.findByFields({
            fields
        })
    }

    /**
     * Send notifications
     * @param {*} fields - Fields to be matched
     */
    static async sendNotificationUsers(_, fields) {
        var sendNotificationTo = async function(i) {
            console.log("[" + new Date().toLocaleString() + "] Notification envoyée à : " + i['id'])
        };

        const gold = await this.findMatching(this, {grade:'gold'})
        await setTimeout(function test1()
        {    
            console.log("\n-- GRADE OR --")
            gold.forEach(sendNotificationTo)
        }, 0);

        const silver = await this.findMatching(this, {grade:'silver'})
        await setTimeout(function test1()
        {    
            console.log("\n-- GRADE ARGENT --")
            silver.forEach(sendNotificationTo)
        }, 30000);

        const others = await this.findAllBronzeAndOther(this)
        await setTimeout(function ()
        {    
            console.log("\n-- AUTRES GRADES --")
            others.forEach(sendNotificationTo)
        }, 60000);
        return this.findAll()
    }

    /**
     * Creates a new user
     */
    static async createEntry(_, {grade, mail}) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
            let _result = await this.insert(connection, {
                data: {
                    grade,
                    mail
                }
            })

            return this.getByID(_, {id: _result.insertId})
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }

    /**
     * Updates a user 
     */
    static async updateEntry(_, {id, grade, mail}) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {

            await this.update(connection, {
                id,
                data: {
                    grade,
                    mail
                }
            })

            return this.getByID(_, {id})
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }
}

module.exports = User