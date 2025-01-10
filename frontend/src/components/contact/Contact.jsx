

const ContactPage = () => {
  return (
    <div>
        <section style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}>
  <h2 className="text-center">Contact Us</h2>
  <form className="mt-4 mx-auto" style={{ maxWidth: "600px" }}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" />
    </div>
    <div className="mb-3">
      <label htmlFor="message" className="form-label">Message</label>
      <textarea className="form-control" id="message" rows="3"></textarea>
    </div>
    <button type="submit" className="btn btn-warning">Send Message</button>
  </form>
</section>

    </div>
  )
}

export default ContactPage