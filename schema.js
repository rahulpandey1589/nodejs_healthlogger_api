export const typedef = `#graphql
type CategoryMaster {
    id: ID!,
    category_name: String,
    description: String,
    isActive: String, 
    createdAt: String
    }
type TestDetail{
    name: String, 
    unit: String, 
    approved_limits:String, 
    isHeader: Boolean
}


type Query{
    categories:[CategoryMaster]
    testDetails: [TestDetail]
}
`