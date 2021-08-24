import UserContext from "../contexts/UserContext";
import React, {Component} from "react";

export default class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Oucema",
            lastName: "Jlaiel",
            email: "oucema@oucema.fr",
            deliveryAddresses: [
                {
                    id: "1",
                    street: 'Rue des Grazons',
                    number: "4",
                    additionalAddress: "Porte 4",
                    zipCode: "45800",
                    city: 'St Jean de Braye',
                    state: "Loiret",
                    country: "France"
                }
            ],
            user: props.user,
            favoriteAddress: "1"
        }
    }
    
    render() {
        return (
            <UserContext.Provider value={{
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                deliveryAddresses: this.state.deliveryAddresses,
                user: this.state.user,
                favoriteAddress: this.state.favoriteAddress,
                setUser: (user) => {
                    this.setState({user: user})
                },
                addAddress: (address) => {
                    let addresses = {...this.state}.deliveryAddresses.concat(address);
                    this.setState({deliveryAddresses: addresses})
                },
                editAddress: (editedAddress) => {
                    let addresses = {...this.state}.deliveryAddresses;
                    const addressIndex = addresses.findIndex((address => address.id === editedAddress.id));
                    addresses[addressIndex] = editedAddress;
                    this.setState({deliveryAddresses: addresses})
                }
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
