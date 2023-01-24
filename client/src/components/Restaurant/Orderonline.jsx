import React, { useState, useEffect } from "react";
import { AiOutlineCompass } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";

// components
import FloatMenuBtn from "../OrderOnline/FloatMenuBtn";
import FoodList from "../OrderOnline/FoodList";
import MenuListContainer from "../OrderOnline/MenuListContainer";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getFoodList } from "../../redux/reducers/food/food.action";

const OrderOnline = () => {
  const [menu, setMenu] = useState([]);
  const [selected, setSelected] = useState("");

  const onClickHandler = (e) => {
    if (e.target.id) {
      setSelected(e.target.id);
    }
    return;
  };

  const dispatch = useDispatch();

  const restaurant = useSelector(
    (globaldata) => globaldata.restaurant.selectedRestaurant.restaurant
  );

  useEffect(() => {
    restaurant &&
      dispatch(getFoodList(restaurant.menu)).then((data) => {
        setMenu(data.payload.menus.menus);
      });
  }, [restaurant]);

  return (
    <>
      <div className="w-full flex items-start">
        <aside className="sticky top-16 hidden md:flex flex-col gap-1 border-r overflow-y-scroll border-gray-200 w-1/4 h-screen">
          {menu.map((item, index) => (
            <MenuListContainer
              {...item}
              key={index}
              onClickHandler={onClickHandler}
              selected={selected}
              target={index}
            />
          ))}
        </aside>
        <div className="w-full px-3 md:w-3/4 sticky overflow-auto h-screen top-16">
          <div className="pl-3 mb-4">
            <h2 className="text-xl font-semibold">Order Online</h2>
            <h4 className="flex items-center gap-2 font-light text-gray-500">
              <AiOutlineCompass /> Live Track Your Order | <BiTimeFive /> 45 min
            </h4>
          </div>
          <section className="flex  overflow-y-screen flex-col gap-3 md:gap-5">
            {menu.map((item, index) => (
              <FoodList key={index} {...item} target={index} />
            ))}
          </section>
        </div>
      </div>
      <FloatMenuBtn
        menu={menu}
        onClickHandler={onClickHandler}
        selected={selected}
      />
    </>
  );
};
export default OrderOnline;