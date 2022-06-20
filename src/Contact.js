import './Contact.css'

function Contact() {

  return (
    <div id="contact_component">
      <h1>Kontakt</h1>
      <div id="contacts">
          <h2>DIGITEHNOLOOGIATE INSTITUUT</h2>

          <h4 id="adress"> Narva mnt 29, 10120 Tallinn</h4>
          
          <h4 id="phone"> (+372) 640 9421</h4>
      
          
          <h4 id="mail"> dti@tlu.ee</h4>

          <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.6441687686624!2d24.77090941607674!3d59.43900898169735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692935b83ed2f0d%3A0x9d35f9454352eda4!2sNarva%20mnt%2029%2C%2010120%20Tallinn!5e0!3m2!1set!2see!4v1655361528240!5m2!1set!2see" ></iframe>
      </div>
    </div>
  )
}

export default Contact