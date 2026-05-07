<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. The Robot Trap (Honeypot)
    // If this hidden field is filled, it's a bot. Stop execution.
    if (!empty($_POST['robot_trap'])) {
        exit("Spam detected."); 
    }

    // 2. Sanitize and collect data
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone   = strip_tags(trim($_POST["phone"]));
    $type    = strip_tags(trim($_POST["involvement_type"]));
    $message = strip_tags(trim($_POST["message"]));

    // 3. Email Configuration
    $to = "sicklecellalliance@gmail.com";
    $subject = "New $type Application: $name";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Involvement Type: $type\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: SCCAU Website <noreply@sccau.org>";

    // 4. Send the Email
    if (mail($to, $subject, $email_content, $email_headers)) {
        // Redirect to a 'Thank You' page on success
        header("Location: thank-you.html");
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }

} else {
    echo "There was a problem with your submission, please try again.";
}
?>