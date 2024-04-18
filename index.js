import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import _db from './_db.js'
import { typeDefs } from './schema.js';

//set server

const resolvers ={
    Query: {
        games(){
            return _db.games
        },
        game(_, args) {
            return _db.games.find((game) => game.id === args.id)
        },
        authors() {
            return _db.authors
        },
        auther(_, args) {
            return _db.authors.find((auther) => auther.id === args.id)
        },
        reviews(){
            return _db.reviews
        },
        review(_, args) {
            return _db.reviews.find((review) => review.id === args.id)
        }

    },
    Game:{
        reviews(parent){
            return _db.reviews.filter((r)=>r.game_id === parent.id)
        }
    },
    Auther:{
        reviews(parent){
            return _db.reviews.filter((r)=>r.author_id === parent.id)
        }
    },
    Review:{
        auther(parent){
            return _db.authors.find((a)=>a.id === parent.author_id)
        },
        game(parent){
            return _db.games.find((g)=>g.id === parent.game_id)
        }
    },
    Mutation:{
        deleteGame(_,args){
         _db.games = _db.games.filter((g)=> g.id != args.id) 
         return _db.games
        },
        addGame(_,args){
            let game ={
                ...args.game,
                id:Math.floor(Math.random() *10000).toString()
            }
            _db.games.push(game)

            return game
        },
        updateGame(_,args){
            _db.games = _db.games.map((g) =>{
                if(g.id === args.id)
                {
                    return {...g, ...args.edits}
                }
                return g
            })
            return _db.games.find((g) => g.id === args.id)
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = startStandaloneServer(server,{
    listen:4000
})

console.log("server ready at", 4000)