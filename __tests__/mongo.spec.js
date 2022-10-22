const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
    let connection;
    let dbBuyers;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        dbBuyers = await connection.db('Buyers');
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should insert a new buyer into the buyers collection', async () => {
        const users = dbBuyers.collection('Buyers');

        const mockUser = {
            id: 'some-buyer-id',
            first_name: "Emily",
            last_name: "Button",
            email: "emilyButton@gmail.com",
            phone: "1234567899",
            birthday: "02/02/1989",
            age: "34"
        }

        await users.insertOne(mockUser)

        const insertedUser = await users.findOne({ id: 'some-buyer-id' });

        expect(insertedUser).toEqual(mockUser)
    },
        
    it('should delete a buyer from the buyers collection', async () => {
        const users = dbBuyers.collection('Buyers')
        await users.deleteMany({ id: 'some-buyer-id' })
        const deletedUser = await users.findOne({ id: 'some-buyer-id' });
        expect(deletedUser).toEqual(null)
    })
)})