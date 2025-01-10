import { Link } from "react-router-dom"

const PageNotFound = () => {
    const styles = {
        img: {
            width: "600px",
            height: "300px",
        },
        btn: {
            width: "150px",
            height: "50px",
            backgroundColor: "#f5c518",
            color: "Black",
            padding: "10px",
            borderRadius: "10px",
            textDecoration: "none",
            textAlign: "center",
            margin: "20px"

        },
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            
        }

    }
  return (
    <div className='container mt-5' style={styles.container}>
        <h1 className="text-danger text-center">Page Not Found</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRyl3KOobxh1qt0aLElLE6SnF1cFGZ8yo37w&s" alt="404 Page Not Found " style={styles.img} />
        <Link to="/" style={styles.btn}>Go Home</Link>
    </div>
  )
}

export default PageNotFound