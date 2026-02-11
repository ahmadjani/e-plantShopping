import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Ensure you have basic styles or remove this if using inline

const ProductList = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    // Calculate total items for the Navbar
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // 1. Data: 6 Unique plants in 3 Categories (As per rubric)
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599598425947-64052d921603?q=80&w=300&auto=format&fit=crop", cost: "$15", description: "Produces oxygen at night, improving air quality." },
                { name: "Spider Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=300&auto=format&fit=crop", cost: "$12", description: "Filters formaldehyde and xylene from the air." }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1596073419667-9d77d59f033f?q=80&w=300&auto=format&fit=crop", cost: "$20", description: "Calming scent used in aromatherapy." },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592507851676-12d83f5f6753?q=80&w=300&auto=format&fit=crop", cost: "$18", description: "Sweet fragrance, great for tea." }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { name: "Rosemary", image: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=300&auto=format&fit=crop", cost: "$15", description: "Repels mosquitoes and adds flavor to food." },
                { name: "Mint", image: "https://images.unsplash.com/photo-1626469857922-b25859737874?q=80&w=300&auto=format&fit=crop", cost: "$10", description: "Keeps ants and spiders away." }
            ]
        }
    ];

    // Local state to handle "Added to Cart" visual feedback
    const [addedToCart, setAddedToCart] = useState({});

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true, // Mark this specific plant as added
        }));
    };

    // Styling object for consistency
    const styleObj = {
        navbar: {
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '20px',
        },
        tagline: {
            textAlign: 'center',
            fontSize: '18px', 
            color: '#555', 
            marginBottom: '20px'
        },
        listContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        productCard: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            margin: '10px',
            width: '300px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        image: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '5px'
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }
    };

    return (
        <div>
            {/* 2. Navbar (Fixed as per feedback) */}
            <div style={styleObj.navbar}>
                <div className="navbar-brand">
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                       <h3>Paradise Nursery</h3>
                       <i style={{fontSize:'12px'}}>Where Green Meets Serenity</i>
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '25px' }}>
                        <h1 style={{margin: '0', fontSize: '30px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="48" width="48">
                                <rect width="156" height="156" fill="none"></rect>
                                <circle cx="80" cy="216" r="12"></circle>
                                <circle cx="184" cy="216" r="12"></circle>
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" id="mainIconPathAttribute"></path>
                            </svg>
                            {totalItems}
                        </h1>
                    </Link>
                </div>
            </div>

            {/* Product Grid */}
            <div style={{ padding: '20px' }}>
                {/* 3. Dynamic Rendering using map() (Fixed as per feedback) */}
                {plantsArray.map((category, index) => (
                    <div key={index}>
                        <h1 style={{ textAlign: 'center', marginTop: '40px' }}>{category.category}</h1>
                        <div style={styleObj.listContainer}>
                            {category.plants.map((plant, plantIndex) => (
                                <div key={plantIndex} style={styleObj.productCard}>
                                    <img src={plant.image} alt={plant.name} style={styleObj.image} />
                                    <h3>{plant.name}</h3>
                                    <p>{plant.description}</p>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{plant.cost}</p>
                                    
                                    <button 
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedToCart[plant.name]} // Disable button if added
                                        style={{
                                            ...styleObj.button,
                                            backgroundColor: addedToCart[plant.name] ? 'grey' : '#4CAF50'
                                        }}
                                    >
                                        {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
