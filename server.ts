import * as express from 'express'
import * as expressGraphQL from 'express-graphql'
import { Schema } from './schema/schema'

// const express = import('express')
// const expressGraphQL = require('express-graphql')
const app = express()

app.use('/graphql', expressGraphQL({
		graphiql: true,
		schema: Schema
	})
)

app.listen(4000, () => {
	console.log('Listening to you')
})