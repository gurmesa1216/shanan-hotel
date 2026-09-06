import React from 'react'
import './DishCard.css'

import { useLanguage } from '../i18n/LanguageContext.jsx'


export default function DishCard({
  dish,
  onAdd,
  onView
}) {


  const { t } = useLanguage()


  const unavailable = dish.available === false



  return (

    <div

      className={
        `dish-card ${
          unavailable
          ?
          'dish-card--unavailable'
          :
          ''
        }`
      }


      onClick={() => onView(dish)}

    >



      <div className="dish-card__img-wrap">


        <img

          src={dish.image}

          alt={dish.name}

          className="dish-card__img"

          loading="lazy"

        />



        {
          unavailable && (

            <span className="dish-card__unavailable-tag">

              {t("hidden")}

            </span>

          )
        }




        {
          !unavailable && (

            <button

              className="dish-card__add-btn"


              onClick={(e)=>{

                e.stopPropagation()

                onAdd(dish)

              }}


              aria-label={
                `${t("addCart")} ${dish.name}`
              }

            >


              <svg

                width="16"

                height="16"

                viewBox="0 0 24 24"

                fill="none"

                stroke="currentColor"

                strokeWidth="2.5"

                strokeLinecap="round"

              >

                <path d="M12 5v14M5 12h14"/>


              </svg>


            </button>


          )
        }


      </div>





      <div className="dish-card__body">


        <h3 className="dish-card__name">

          {dish.name}

        </h3>



        <p className="dish-card__portion">

          {dish.portion}

        </p>



        <p className="dish-card__price">

          {dish.price.toLocaleString()} ETB

        </p>



      </div>



    </div>

  )

}