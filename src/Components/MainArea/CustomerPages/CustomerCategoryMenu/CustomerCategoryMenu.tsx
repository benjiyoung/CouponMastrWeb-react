import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/Coupon";
import { customerUpdateAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import "./CustomerCategoryMenu.css";

function CustomerCategoryMenu(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {
            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/customer/all`);
            const customerEmail = store.getState().authState.user.email;
            const loggedCustomerArray = store.getState().customerState.customers.filter(function(item){return item.email === customerEmail});
            const loggedCustomer = loggedCustomerArray[0];
            loggedCustomer.coupons = coupons;
            store.dispatch(customerUpdateAction(loggedCustomer));
         setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="CustomerCategoryMenu">
			<nav>
                <h2> Choose a category</h2>
                <NavLink exact to="/customer/category/FOOD"> Food</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/VACATION"> Vacation</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/BEAUTY"> Beauty</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/HOME"> Home</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/ELECTRICITY"> Electricity</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/FASHION"> Fashion</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/SPORT"> Sport</NavLink> <br/><br/>
                <NavLink exact to="/customer/category/PETS"> Pets</NavLink> <br/><br/>
            </nav>
        </div>
    );
}

export default CustomerCategoryMenu;
