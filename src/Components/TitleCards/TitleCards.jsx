import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

  const cardsRef = useRef()

  const [apidata,setapidata]=useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzI5M2Q1ZWIzYTRjODMyMzcyZmUzMmMwMjgxYjFmYiIsInN1YiI6IjY2MzljNjUxMmEwOWJjMDEyOTVhZTcyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0io4OsuiMKBtRMtQUC_-GRLqqrh9AMFbIm3eTAegRD0'
    }
  };

  
  
  const handelWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing?'}language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response =>setapidata(response.results))
    .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel', handelWheel)


  }, [])
  return (
    <div className="titlecards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apidata.map((card, index) => {
          return <Link to ={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>

  )
}

export default TitleCards