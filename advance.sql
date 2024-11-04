-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2024 at 10:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `advance`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'adminUser', 'admin@example.com', 'securepassword', 'admin', '2024-11-01 22:08:11', '2024-11-01 22:08:11'),
(4, 'yourUsername', 'user@example.com', '$2b$10$HIog6aAh9LiEMcvqxTtOiu5nJsda3nuxAN.cNocmGSKt2D73mqSly', 'admin', '2024-11-01 22:35:11', '2024-11-01 22:35:11'),
(5, 'your1Username', 'user1@example.com', '$2b$10$lu5IGpwCJygnLH1.ISx96OG32pmmaPjYL4nsB1ZMUqZFmbth1XDfy', 'admin', '2024-11-01 22:51:15', '2024-11-01 22:51:15'),
(6, 'your11Username', 'user11@example.com', '$2b$10$Y4V3uGqNpFdOmeNr1lkinuYrNtj4007fRXQZJ0njgbUX4dOr/6muK', 'admin', '2024-11-01 22:53:06', '2024-11-01 22:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `dresses`
--

CREATE TABLE `dresses` (
  `id` int(11) NOT NULL,
  `style` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `color` varchar(30) NOT NULL,
  `available` tinyint(1) DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dailyRate` float DEFAULT NULL,
  `weeklyRate` float DEFAULT NULL,
  `monthlyRate` float DEFAULT NULL,
  `discount` float DEFAULT 0,
  `pickupLatitude` float DEFAULT NULL,
  `pickupLongitude` float DEFAULT NULL,
  `default_insurance_rate` decimal(10,2) DEFAULT 5.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dresses`
--

INSERT INTO `dresses` (`id`, `style`, `size`, `color`, `available`, `price`, `description`, `created_at`, `updated_at`, `dailyRate`, `weeklyRate`, `monthlyRate`, `discount`, `pickupLatitude`, `pickupLongitude`, `default_insurance_rate`) VALUES
(1, 'Summer Dress', 'M', 'Red', 1, 49.99, 'A stylish summer dress', '2024-10-28 13:45:33', '2024-10-28 13:45:33', NULL, NULL, NULL, 0, NULL, NULL, 5.00),
(2, 'Evening Gown', 'L', 'Black', 1, 120.00, 'Elegant evening gown for formal occasions', '2024-10-28 13:45:33', '2024-10-28 13:45:33', NULL, NULL, NULL, 0, NULL, NULL, 5.00),
(3, 'Casual Dress', 'S', 'Blue', 0, 30.50, 'Perfect for casual outings', '2024-10-28 13:45:33', '2024-10-28 13:45:33', NULL, NULL, NULL, 0, NULL, NULL, 5.00),
(5, 'Formal', 'L', 'Black', 1, 89.99, 'A classic black formal dress', '2024-11-02 07:23:30', '2024-11-02 08:31:16', 10, 60, 200, 5, NULL, NULL, 5.00),
(6, 'Evening Gown', 'M', 'Red', 1, 150.00, 'Elegant red evening gown perfect for formal events.', '2023-02-01 04:30:00', '2024-10-31 21:37:03', 20, 100, 400, 10, 34.0522, -118.244, 5.00),
(7, 'Cocktail Dress', 'S', 'Black', 1, 100.00, 'Stylish black cocktail dress suitable for parties.', '2023-02-02 05:00:00', '2024-10-31 21:37:03', 15, 75, 300, 5, 34.0522, -118.244, 5.00),
(8, 'Sundress', 'L', 'Yellow', 1, 75.00, 'Bright yellow sundress ideal for summer days.', '2023-02-03 06:15:00', '2024-10-31 21:37:03', 10, 50, 200, 0, 34.0522, -118.244, 5.00),
(9, 'Ball Gown', 'M', 'Blue', 1, 200.00, 'Royal blue ball gown, perfect for proms and formal occasions.', '2023-02-04 07:20:00', '2024-10-31 21:37:03', 25, 125, 500, 15, 34.0522, -118.244, 5.00),
(10, 'Wedding Dress', 'XL', 'White', 1, 300.00, 'Beautiful white wedding dress with lace detailing.', '2023-02-05 08:30:00', '2024-10-31 21:37:03', 30, 150, 600, 20, 34.0522, -118.244, 5.00),
(11, 'Casual Dress', 'M', 'Green', 1, 50.00, 'Comfortable green dress for everyday wear.', '2023-02-06 09:40:00', '2024-10-31 21:37:03', 8, 40, 160, 0, 34.0522, -118.244, 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `dressId` int(11) NOT NULL,
  `orderType` enum('purchase','rental') NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `totalPrice` decimal(10,2) NOT NULL,
  `orderDate` datetime DEFAULT current_timestamp(),
  `status` enum('pending','completed','canceled','returned') DEFAULT 'pending',
  `rentalStartDate` datetime DEFAULT NULL,
  `rentalEndDate` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userEmail`, `dressId`, `orderType`, `quantity`, `totalPrice`, `orderDate`, `status`, `rentalStartDate`, `rentalEndDate`, `createdAt`, `updatedAt`) VALUES
(5, 'john@example.com', 1, 'rental', 1, 49.99, '2024-10-31 10:16:31', 'pending', '2024-10-31 00:00:00', '2024-11-07 00:00:00', '2024-10-31 10:16:31', '2024-10-31 10:16:31'),
(6, 'sam1@gmail.com', 1, 'rental', 1, 49.99, '2024-11-02 08:57:20', 'pending', '2024-10-31 00:00:00', '2024-11-07 00:00:00', '2024-11-02 08:57:20', '2024-11-02 08:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `rentals`
--

CREATE TABLE `rentals` (
  `rental_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `dress_id` int(11) NOT NULL,
  `rental_days` int(11) NOT NULL,
  `rented_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('customer','user','admin') DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `address`, `profile_picture`, `created_at`, `role`) VALUES
(1, 'Alice Johnson', 'alice@example.com', '$2a$10$abcDEF1234567', '123-456-7890', '123 Elm St, Springfield, IL', '/images/profiles/alice.jpg', '2023-01-15 06:30:00', NULL),
(2, 'Bob Smith', 'bob@example.com', '$2a$10$xyzABC1234567', '234-567-8901', '456 Oak St, Lincoln, NE', '/images/profiles/bob.jpg', '2023-01-16 07:00:00', 'customer'),
(3, 'Carol White', 'carol@example.com', '$2a$10$mnopQRST1234567', '345-678-9012', '789 Pine St, Omaha, NE', '/images/profiles/carol.jpg', '2023-01-17 08:15:00', 'customer'),
(4, 'David Brown', 'david@example.com', '$2a$10$ghiJKL1234567', '456-789-0123', '159 Maple St, Denver, CO', '/images/profiles/david.jpg', '2023-01-18 09:20:00', 'customer'),
(5, 'Siwar', 'Siwar@example.com', '$2a$10$9pnX2VT11zTbYpVEnJnbiORdPDi7kjP5GmIra6Q828073sT4YC8WS', '1234567890', '123 Main Street', NULL, '2024-10-18 22:05:50', 'customer'),
(6, 'Soso', 'Soso@example.com', '$2a$10$q50TX6QW3VRk6DqbB1HMYeN5yMJS7rS7F39OGCHvSwnmUqFj9Qy8.', '1234567890', 'Main Street', NULL, '2024-10-19 14:35:48', 'customer'),
(7, 'Siwar1', 'Siwar1@example.com', '$2b$10$x6xUgYJiBgUMs6P0fB0xne/UKu1TexbHElh.fE2uQoinRfDcXhCEC', '1234567890', '123 Example St, Example City, EX 12345', NULL, '2024-10-27 20:49:45', 'admin'),
(8, 'SiwarS1', 'SiwarS1@example.com', '$2b$10$xa.T6Vpr7KdNunojUzycMeBC2tmk3oLn5MrP4iWiuGFn5iXbVlUBK', '1234567890', '123 Example St, Example City, EX 12345', NULL, '2024-10-28 16:27:30', 'customer'),
(9, 'test', 't1@example.com', '$2b$10$i0nROuJJjCVuiAb7wHODsu3wAkzQESElXpmfKI7yKdWFtmrMGk4gK', '1234567890', '123 Example St, Example City, EX 12345', NULL, '2024-10-28 18:30:54', 'admin'),
(10, 'test2', 't2@example.com', '$2b$10$frwhynQtlx8NDmpDVN2rSu4m1FbU8YChgwz7TBnYAN3tLpT0eq3vm', '1234567890', '123 Example St, Example City, EX 12345', NULL, '2024-10-28 21:01:24', 'customer'),
(11, 'Example User', 'example@example.com', 'password123', NULL, NULL, NULL, '2024-10-28 21:07:07', 'customer'),
(13, 'New Name', 'john@example.com', '$2b$10$792Oy32vgaU7AyUoDIFJ2eWOAf5h2GErBGqy2k4xFe6VJzNkgfvx6', '123-456-7890', '123 New Street', NULL, '2024-10-30 20:22:25', 'user'),
(14, 'user1', 'user@example.com', '$2b$10$f9Oiic8hy9isnKIcmR8HLOKYRMPafIjZ6Gg/uZq1KwbiMTVvQ7Xj2', '123', '123 Street, City', NULL, '2024-11-01 22:17:29', 'user'),
(15, 'sam', 'sam@gmail.com', '$2b$10$kpfWm84DmzUv3C6IxUp8k.57.GMiVqIzHVLdt2g/EyH.JJrAn03Ze', '3212', 'dsgdg', NULL, '2024-11-01 23:06:35', 'user'),
(16, 'New Name', 'sam1@gmail.com', '$2b$10$UFnCf.hRN2q7jq2PxqEUnukbRogrl4rFCKdy7NfmXiOybkzX/XVUG', '123-456-7890', '123 New Street', NULL, '2024-11-01 23:26:04', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `dressId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `dressId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `userEmail`, `dressId`, `createdAt`, `updatedAt`) VALUES
(2, 'john@example.com', 2, '2024-10-31 11:38:57', '2024-10-31 11:38:57'),
(3, 'sam1@gmail.com', 2, '2024-11-02 08:58:05', '2024-11-02 08:58:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `dresses`
--
ALTER TABLE `dresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userEmail` (`userEmail`),
  ADD KEY `dressId` (`dressId`);

--
-- Indexes for table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`rental_id`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `dress_id` (`dress_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dressId` (`dressId`),
  ADD KEY `userEmail` (`userEmail`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dressId` (`dressId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dresses`
--
ALTER TABLE `dresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`dressId`) REFERENCES `dresses` (`id`);

--
-- Constraints for table `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `rentals_ibfk_2` FOREIGN KEY (`dress_id`) REFERENCES `dresses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`dressId`) REFERENCES `dresses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`dressId`) REFERENCES `dresses` (`id`);
COMMIT;

ALTER TABLE dresses ADD COLUMN dailyRate FLOAT NOT NULL DEFAULT 0;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
