import React, {Component} from "react";

class App extends React.Component {

   constructor () {
    super ()

    this.state ={
      users : [],
      isLoading: false,
      isError: false
    }

  }

   //async function get request

   async componentDidMount () {
    this.setState ({isLoading : true})
    const response = await fetch ('https://jsonplaceholder.typicode.com/users')
    //console.log(response.json())
    if(response.ok) {
      const users = await response.json()
      console.log(users)
      this.setState({users:users})
      this.setState({isLoading: false})
    }
    else {
      this.setState({isError : true, isLoading: false})
    }
   }

      renderTableHeader = () => {
        return Object.keys (this.state.users[0]).map(Attr => <th key={Attr}> {Attr.toUpperCase()}</th>)
      }

      renderTablerows = () => {
        return this.state.users.map(users => {
          return (
            <tr key={users.id}>
                 <td>{users.id}</td>
                 <td>{users.name}</td>
                 <td>{users.username}</td>
                 <td>{users.email}</td>
                 <td>
                  {`${users.address.street} ${users.address.city}`}
                 </td>
                 <td>{users.phone}</td>
                 <td>{users.website}</td>
                 <td>{` ${users.company.name}`}</td>
            </tr>
          )
        })
      }

  render () {
    const {users, isLoading, isError} = this.state

    if(isLoading) {
      return <div>Loading...</div>
    }
    
    if(isError) {
      return <div>Error....</div>
    }
    return users.length > 0 
    ? ( 
      <table>
        <thead>
          <tr>
            {this.renderTableHeader ()}
          </tr>
        </thead>
         <tbody >
          {this.renderTablerows ()}
         </tbody>
      </table>
    ) : (
      <div> No users </div>
    )
  
   
  }
}
export default App
