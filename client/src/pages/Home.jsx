import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules'
import ListingItem from '../components/ListingItem';

function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOffer = await fetch("/api/listing/get?offer=true&limit=6");
        const dataOffer = await resOffer.json();
        setOfferListings(dataOffer);

        const resRent = await fetch("/api/listing/get?type=rent&limit=6");
        const dataRent = await resRent.json();
        setRentListings(dataRent);

        const resSale = await fetch("/api/listing/get?type=sale&limit=6");
        const dataSale = await resSale.json();
        setSaleListings(dataSale);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-20 px-5 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-semibold text-3xl lg:text-5xl'>Find your next <span className='text-slate-500 '>Perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm '>
          DreamDwelling is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline' >
          Let's get Started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover', }}
                className='h-[500px]'
                key={listing.id}>

              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing result for offer, sale and rent */}
      <div className='max-w-5xl mx-auto p-4 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-3xl font-semibold text-slate-700 mb-4'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'search?offer=true'}>
                  Show more..
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
            </div>
          )}

          {rentListings && rentListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-3xl font-semibold text-slate-700 mb-4'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'search?type=rent'}>
                  Show more..
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
            </div>
          )}

          {saleListings && saleListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-3xl font-semibold text-slate-700 mb-4'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'search?type=sale'}>
                  Show more..
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
              {
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Home