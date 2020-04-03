<?php
  /**
  * Requires the PHP Mail Form library
  * The PHP Mail Form library is available only in the pro version of the template
  * The library should be uploaded to: lib/php-mail-form/php-mail-form.php
  * For more info and help: https://templatemag.com/php-mail-form/
  */

  if (isset($_POST['submit']})) {
      $name = $_POST['name'];
      $subject = $_POST['subject'];
      $mailFrom = $_POST['mail'];
      $message = $_POST['message'];

      $mailTo = "stastnyp@seznam.cz";
      $headers = "From: ".$mailFrom;
      $txt = "You have received an e-mail from ".$name.".\n\n".$message;

      mail($mailTo, $subject, $txt, $headers);
      header("Location: contact.html?mailsend");
  }

  /*
    $contactform = new PHP_Mail_Form;
    $contactform->ajax = true;


    $contactform->to = 'stastnyp@seznam.cz';
    $contactform->from_name = $_POST['name'];
    $contactform->from_email = $_POST['email'];
    $contactform->subject = $_POST['subject'];

    $contactform->add_message( $_POST['name'], 'From');
    $contactform->add_message( $_POST['email'], 'Email');
    $contactform->add_message( $_POST['message'], 'Message', 10);

    echo $contactform->send();
  ?>
  */

?>
