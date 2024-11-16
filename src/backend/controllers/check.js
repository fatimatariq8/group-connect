import bcrypt from 'bcrypt';

const testPasswordComparison = async () => {
    const plainTextPassword = "qwerty";
    const hashedPassword = "$2b$10$em2V2HN5YRtJLzho/kq7c.J1Egd9TZat0zUq7ptPWWM1LpRJOsYRa"; // Replace with actual hashed password from DB

    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    console.log("Password comparison result:", isMatch);
};

testPasswordComparison();
