# AdvancePro

# DressOnDemand

**DressOnDemand** is a sustainable fashion rental platform that allows customers to rent dresses for special occasions. The platform provides a wide variety of dresses categorized by style, season, and color, helping users choose the perfect outfit without the need to purchase. Through flexible rental durations, location-based recommendations, and a seamless rental experience, we aim to make fashion more accessible and eco-friendly.

## Key Features

- **User-Friendly Listings**: Browse a vast collection of dresses categorized by style, season (winter/summer), and color. Detailed information is provided, including size, availability, and price.
  
- **Seamless Rental Management**: Efficient management of rental requests, orders, and availability with flexible rental duration options and an easy checkout process.
  
- **Wishlist Functionality**: Users can save dresses to their wishlist for future rentals.
  
- **Location-Based Recommendations**: Personalized dress recommendations based on local weather using external APIs, categorized into winter or summer attire.
  
- **Admin Functionality**: Admin users can add, update, or delete dresses. Admin features also include item approval, revenue reporting, and verification management.
  
- **Reviews and Recommendations**: Users can add reviews for dresses and receive recommendations based on their preferences and ratings.

## Technologies Used

- **Backend Framework**: Node.js with RESTful API architecture.
- **Database**: MySQL
- **Development Tools**: XAMPP, Postman, GitHub, Visual Studio Code
- **External APIs**: Maps, Weather APIs
- **Version Control**: GitHub for collaborative development

## Project Structure

- **Controllers**: Contains logic for managing requests and interactions with models. E.g., `notificationsController.js`, `reviewController.js`.
- **Routes**: Defines the API routes and links them with respective controller functions. E.g., `logistics.routes.js`.
- **Models**: Defines the structure of database entities like `user.model.js`, `dress.model.js`, and `order.model.js`. It also contains migration files for schema updates.
- **Modules**: Houses independent subcomponents like `auth`, `insurance`, and `notifications`.
- **Roles**: Distinguishes between different user roles like Admin and User for proper access control.
- **Services**: Shared business logic to promote reusability across the app.
- **Configuration & Utilities**: Includes environment variables (e.g., `.env`) and utility files (e.g., `connection.js` for database connection).

## Features Breakdown

- **Admin Features**: 
  - Add, update, and delete dresses
  - Revenue reporting
  - Verification and item approval
  
- **User Features**: 
  - Search and filter dresses by style, season, or color
  - Rent dresses and manage rentals
  - Add items to the wishlist
  - Review and rate dresses

- **Weather-Based Dress Recommendation**: 
  - Personalized suggestions based on the current weather at the user's location.

## How to Run the Project

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- XAMPP (for local server and database management)
  
### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url/DressOnDemand.git
   cd DressOnDemand
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with necessary environment variables:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Weather and Maps API keys

4. Run the database migration to set up the schema:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Access the platform at `http://localhost:3000`.

## API Documentation

You can find the full API documentation [here](https://github.com/SiwarSamer/AdvancePro/wiki).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

```

Feel free to modify the sections such as the repository URL or API documentation link as needed.
