import Head from 'next/head'
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic"
import Title from '../components/title'
import TableCol from '../components/tablecol'

const Home = () => {

  const [IPaddress, setIPaddress] = useState("192.212.174.101")
  const [Location, setLocation] = useState("Brooklyn, NY 10001")
  const [TimeZone, setTimezone] = useState("UTC -5:00")
  const [ISP, setISP] = useState("SpaceX Starlink")

  const [Latitude, setLatitude] = useState(+51.505)
  const [Longitude, setLongitude] = useState(-0.09)
  const [userInput, setUserInput] = useState("")

  const getAPIresponse = async () => {
      // Regular expression to check if string is a IP address
      const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
      var APIurl = ""
      if(regexExp.test(userInput))
          APIurl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_deJ9HUJkVpvqratzl0MwX39OW5hsA&ipAddress=' + userInput
      else
          APIurl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_deJ9HUJkVpvqratzl0MwX39OW5hsA&domain' + userInput
      const APIresponse = await fetch(APIurl).then(response => response.json())
      return APIresponse
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    //utilizando inputIP precisamos atualizar informacoes de localizacao
    console.log(userInput)
    const APIresponse = await getAPIresponse()
    updateLocationInfo(
      APIresponse.ip,
      APIresponse.location.city + ', ' + APIresponse.location.country,
      APIresponse.location.timezone,
      APIresponse.isp,
      APIresponse.location.lat,
      APIresponse.location.lng
    )
  }

  const updateLocationInfo = (newIPaddress, newLocation, newTimeZone, newISP, newLatitude, newLongitude) => {
    setIPaddress(newIPaddress)
    setLocation(newLocation)
    setTimezone(newTimeZone)
    setISP(newISP)
    setLatitude(newLatitude)
    setLongitude(newLongitude)
  }

  const DynamicMap = dynamic(
    () => {
      return import('../components/map')
    },
    { ssr: false }
  );

  return (
    <div>

      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css'
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin=""
        ></script>
      </Head>

      <div className='hero is-small is-info'>
        <div className='hero-body'>

          <Title />

          <form onSubmit={handleSubmit}>
            <div className='level py-4'>
              <div className='level-item has-text-centered'>
                <input
                  className='input is-rounded'
                  type='text'
                  value={userInput}
                  placeholder='Search for any IP address or domain'
                  onChange={e => setUserInput(e.target.value)}
                />
              </div>
              <div className='level-item has-text-centered'>
                <input className = 'button is-link is-rounded' type="submit" value="Submit" />
              </div>
            </div>
          </form>

          <nav className='level has-background-white py-2'>
            <TableCol title='IP Address' content={IPaddress}/>  
            <TableCol title='Location' content={Location}/> 
            <TableCol title='Timezone' content={TimeZone}/>
            <TableCol title='ISP' content={ISP}/>
          </nav>

        </div>
      </div>

      <DynamicMap latitude={Latitude} longitude={Longitude}/>

      <div className='hero is-info'>
        <p className='is-size-6 has-text-centered has-text-weight-light'>
          Feito com Next.js
        </p>
      </div>

    </div>
  )
}

export default Home