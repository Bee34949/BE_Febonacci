const express = require('express');
const app = express();
const port = 3000;



//คำนวณ1-n
const fibonacciSequence = (_n) => {
    let sequence = [];
    let a = 0, b = 1;
    //ฟังชัน fibonacci
    if (_n >= 1) sequence.push(a); //เพิ่มค่าลำดับที่0

    if (_n >= 2) sequence.push(b); //ลำดับที่1
    
    for (let i = 2; i < _n; i++) {
        let temp = a + b;
        if (_n>100)
            break;

        sequence.push(temp); // เพิ่มค่า ต่อไปในลำดับที่กำหนด
        a = b;
        b = temp;
}    
        
        return {sequence:sequence}; // คืนค่า fecc <100
        
}

// ฟังก์ชันสำหรับการคำนวณผลรวมของลำดับ Fibonacci
const SequenceForTotal = (sequence) => {
    return sequence.reduce((acc, num) => acc + num, 0); 
}
app.get('/fibonacci/:number', (req, res) => { //รับพารามิเตอร์
    const number = parseInt(req.params.number);

   

    // ตรวจสอบnumber บวกหรือไม่
    if (!isNaN(number) && number > 0) {
        const result = fibonacciSequence(number);  // เรียกฟังก์ชันคำนวณลำดับ Fibonacci


        
        // ตรวจสอบว่าเกิด error หรือไม่
        if (result.error) {
            res.status(400).json({ "Error นะครับ,": result.error }); // ส่ง error response กลับไป
        } else if (Array.isArray(result.sequence)) { // เช็คว่า sequence เป็น array หรือไม่
            const sum = SequenceForTotal(result.sequence); // คำนวณผลรวมลำดับ Fibonacci
            const fibonacciMessage = 'this is over 100';

            // ส่งผลลัพธ์ลำดับ Fibonacci และผลรวมกลับไป
            res.status(200).json({
                "fibonacci_sequence": result.sequence,
                "fibonacci_sum": sum 
            });
        } else {
            res.status(500).json({
                "error": "เกิดข้อผิดพลาดในการคำนวณ Fibonacci"
            });
        }
    } else {
        res.status(400).json({
            "error": "Error ครับ"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


