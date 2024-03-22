import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper>
        <Grid
          container
          alignItems="center"
          padding={2}
          maxWidth={800}
        >
          <Typography variant="h3">
            Bus Ticket Management System
          </Typography>
          <Typography variant="p" padding={2}>
            Software Requirements Specification (SRS) Document<br />
            <br />
            1. Introduction<br />
            <br />
            1.1 Purpose<br />
            The purpose of this document is to provide a detailed overview of the requirements for the development of a Bus Ticket Booking System. This system aims to facilitate the online booking of bus tickets, enabling users to search for routes, select seats, make reservations, and manage their bookings conveniently.<br />
            <br />
            1.2 Scope<br />
            The Bus Ticket Booking System will cover the entire process of booking bus tickets online, including user registration, route selection, seat availability, payment processing, and booking management. The system will cater to both users and administrators, providing separate interfaces for each role.<br />
            <br />
            1.3 Definitions, Acronyms, and Abbreviations<br />
            - SRS: Software Requirements Specification<br />
            - GUI: Graphical User Interface<br />
            - API: Application Programming Interface<br />
            - DBMS: Database Management System<br />
            - OTP: One-Time Password<br />
            <br />
            2. Overall Description<br />
            <br />
            2.1 Product Perspective<br />
            The Bus Ticket Booking System will be a web-based application accessible via standard web browsers. It will interact with a backend database to store and retrieve user data, bus routes, seat availability, and booking information. Additionally, it may integrate with payment gateways for secure transactions.<br />
            <br />
            2.2 User Classes and Characteristics<br />
            1. Guest User: Can search for bus routes and view schedules without logging in.<br />
            2. Registered User: Can book tickets, manage bookings, and view booking history after logging in.<br />
            3. Administrator: Manages bus routes, schedules, fares, and user accounts.<br />
            <br />
            2.3 Operating Environment<br />
            The system will be deployed on a web server and accessible over the internet. It will require a stable internet connection for users to access and utilize its functionalities.<br />
            <br />
            3. System Features<br />
            <br />
            3.1 User Registration and Authentication<br />
            - Description: Allows users to register for an account and authenticate themselves to access booking functionalities.<br />
            - Inputs: User details (name, email, password), verification code (via email or OTP).<br />
            - Outputs: Confirmation messages, error messages.<br />
            <br />
            3.2 Bus Route Search<br />
            - Description: Enables users to search for available bus routes based on source, destination, and date of travel.<br />
            - Inputs: Source, destination, date of travel.<br />
            - Outputs: List of available bus routes, including schedules and fares.<br />
            <br />
            3.3 Seat Selection<br />
            - Description: Allows users to select preferred seats from available options on chosen bus routes.<br />
            - Inputs: Preferred seats.<br />
            - Outputs: Selected seats.<br />
            <br />
            3.4 Booking Management<br />
            - Description: Enables users to manage their bookings, including viewing, modifying, and cancelling reservations.<br />
            - Inputs: Booking details.<br />
            - Outputs: Confirmation messages, updated booking information.<br />
            <br />
            3.5 Payment Processing<br />
            - Description: Facilitates secure online payments for booked tickets using integrated payment gateways.<br />
            - Inputs: Payment details (credit/debit card information).<br />
            - Outputs: Payment confirmation, transaction ID.<br />
            <br />
            3.6 Admin Dashboard<br />
            - Description: Provides administrators with tools to manage bus routes, schedules, fares, user accounts, and bookings.<br />
            - Inputs: Admin credentials, route details, schedule modifications, user information.<br />
            - Outputs: Success or failure messages.<br />
            <br />
            4. External Interface Requirements<br />
            <br />
            4.1 User Interfaces<br />
            The system will have an intuitive GUI accessible via standard web browsers on desktop and mobile devices.<br />
            <br />
            4.2 Hardware Interfaces<br />
            The system will operate on standard computing hardware with internet connectivity.<br />
            <br />
            4.3 Software Interfaces<br />
            The system may integrate with external APIs for services such as payment processing and email verification.<br />
            <br />
            4.4 Communications Interfaces<br />
            The system will communicate with users via HTTP/HTTPS protocols over the internet.<br />
            <br />
            5. Non-functional Requirements<br />
            <br />
            5.1 Performance Requirements<br />
            - The system should respond to user actions promptly, with a maximum response time of 3 seconds.<br />
            - It should be capable of handling concurrent user sessions efficiently.<br />
            <br />
            5.2 Security Requirements<br />
            - User passwords should be securely hashed and stored in the database.
            - All communication between the client and server should be encrypted using HTTPS.<br />
            - Payment transactions should adhere to PCI DSS compliance standards.<br />
            <br />
            5.3 Reliability Requirements<br />
            - The system should be available 24/7 with minimal downtime for maintenance activities.<br />
            - It should have backup and recovery mechanisms in place to prevent data loss.<br />
            <br />
            5.4 Scalability Requirements<br />
            - The system should be scalable to accommodate a growing number of users and bookings.<br />
            <br />
            6. Other Requirements<br />
            <br />
            6.1 Legal Requirements<br />
            - The system should comply with data protection regulations such as GDPR.<br />
            - It should adhere to industry standards for online payment security.<br />
            <br />
            6.2 Documentation Requirements<br />
            - User documentation should be provided to guide users through the booking process.<br />
            - Technical documentation should be available for system administrators and developers.<br />
            <br />
            7. Appendices:<br />
            <br />
            7.1 Glossary<br />
            - GUI: Graphical User Interface<br />
            - API: Application Programming Interface<br />
            -DBMS: Database Management System<br />
            - OTP: One-Time Password<br />
            <br />
            7.2 References<br />
            - Payment gateway documentation<br />
            - GDPR guidelines<br />
          </Typography>
          <Grid
            container
            padding={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4">
              Class Diagram
            </Typography>
            <img
              width="100%"
              src="/ClassDiagram.png"
              alt="Class Diagram"
            />
            <Typography variant="h4">
              Activity Diagram
            </Typography>
            <img
              width="100%"
              src="/ActivityDiagram.png"
              alt="Activity Diagram"
            />
            <Typography variant="h4">
              Use Case Diagram
            </Typography>
            <img
              width="100%"
              src="/UseCaseDiagram.png"
              alt="Use Case Diagram"
            />
            <Typography variant="h4">
              Sequence Diagram
            </Typography>
            <img
              width="100%"
              src="/SequenceDiagram.png"
              alt="Sequence Diagram"
            />
          </Grid>
        </Grid>
        <Grid
          container
          padding={2}
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h3" textAlign="center" paddingBottom={2}>
            Team Members
          </Typography>
          <Typography variant="h4" padding={2}>
            Arkapravo Ghosh - Sec C - Roll 10<br />
            Shreyansh De - Sec B - Roll 43<br />
            Namrata Saha - Sec C - Roll 28<br />
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default About;