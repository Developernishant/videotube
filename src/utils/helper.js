var nameList = [
    'Aarav', 'Aarush', 'Aayan', 'Adarsh', 'Advait', 'Ahan', 'Ahaan', 'Akarsh', 'Akshat', 'Anay',
    'Anirudh', 'Ansh', 'Arjun', 'Arnav', 'Aryan', 'Atharv', 'Avi', 'Avik', 'Ayush', 'Chirag',
    'Darsh', 'Dev', 'Dhruv', 'Dhyey', 'Dhruva', 'Ishaan', 'Ishan', 'Kabir', 'Kartik', 'Kiara',
    'Krish', 'Kush', 'Mayank', 'Mohit', 'Navya', 'Neha', 'Nihal', 'Nitin', 'Pranav', 'Rahul',
    'Riya', 'Rohan', 'Saanvi', 'Sahil', 'Sakshi', 'Samaira', 'Samarth', 'Sanya', 'Shanaya', 'Shiv',
    'Shreya', 'Siddhant', 'Tanmay', 'Tanvi', 'Vaibhav', 'Vihaan', 'Vivaan', 'Yash', 'Zara'
  ];
  
export function nameGenerate() {
   return nameList[Math.floor(Math.random() * nameList.length)];
  };

var messageList = [
    'Hello!',
    'How are you?',
    'Nice to meet you!',
    'What a beautiful day!',
    'I love coding!',
    'Have a great day!',
    'Thanks for watching!',
    'See you later!',
    'Goodbye!',
    'How was your day?',
    'Keep up the great work!',
    'You are doing amazing!',
    'Let’s make today awesome!',
    'Stay positive!',
    'Believe in yourself!',
    'Every day is a new beginning!',
    'You’ve got this!',
    'Dream big!',
    'Make today count!',
    'Stay curious!',
    'Keep smiling!',
    'You are capable of great things!',
    'Embrace the journey!',
    'Let your light shine!',
    'Be the change you wish to see!',
    'Your potential is limitless!',
    'Enjoy the little things!',
    'Keep pushing forward!',
    'You are stronger than you think!',
    'Today is full of possibilities!',
    'Let’s create something amazing together!'
  ];
  
export function generateMessage() {
    var finalMessage = messageList[Math.floor(Math.random() * messageList.length)];
    return finalMessage;

  };


