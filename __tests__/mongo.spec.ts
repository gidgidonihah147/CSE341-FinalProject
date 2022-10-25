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
    });

    it('should insert a new buyer into the buyers collection', async () => {
        const buyers = dbBuyers.collection('Buyers');

        const mockBuyer = {
            id: 'some-buyer-id',
            first_name: "Emily",
            last_name: "Button",
            email: "emilyButton@gmail.com",
            phone: "1234567899",
            birthday: "02/02/1989",
            age: "34"
        }

        await buyers.insertOne(mockBuyer)

        const insertedUser = await buyers.findOne({ id: 'some-buyer-id' });

        expect(insertedUser).toEqual(mockBuyer)
    },
        
    it('should delete a buyer from the buyers collection', async () => {
        const buyers = dbBuyers.collection('Buyers')
        await buyers.deleteMany({ id: 'some-buyer-id' })
        const deletedBuyer = await buyers.findOne({ id: 'some-buyer-id' });
        expect(deletedBuyer).toEqual(null)
    })
)})