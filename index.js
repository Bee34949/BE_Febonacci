const express = require('express');
const app = express();
const port = 3000; //ใช้ตัวพอร์ต3000

//สร้างวนลูปเพื่อเติมตัวเลขในลำดับfibonacciตามจำนวน TotalNumber
const fibonacciSequence = (TotalNumber) => {
    let sequence = [];
    let TotalNum1 = 0, TotalNum2 = 1;
    //ฟังชัน fibonacci
    if (TotalNumber >= 1) sequence.push(TotalNum1); //เพิ่มค่าลำดับที่0

    if (TotalNumber >= 2) sequence.push(TotalNum2); //ลำดับที่1
    
    for (let Index = 2; Index < TotalNumber; Index++) {  //indexคือค่าดัชนีที่เป็นค่าเริ่มต้นตัวแปร
        let Fibonacci_Values = TotalNum1 + TotalNum2;
        if (TotalNumber>100) break; // ถ้ารับจำนวนค่ามากกว่า100ค่า จะหยุดการทำงานของฟังก์ชันทันที

        sequence.push(Fibonacci_Values); // เพิ่มค่า ต่อไปในลำดับที่กำหนด
        TotalNum1 = TotalNum2;
        TotalNum2 = Fibonacci_Values;
}    
        
        return {sequence:sequence}; // คืนค่า Fibonacci <100
        
}

// ฟังก์ชันสำหรับการคำนวณผลรวมของลำดับ Fibonacci
const SequenceForTotal = (sequence) => {
    return sequence.reduce((Total, CurrentNumber) => Total + CurrentNumber, 0); 
}
app.get('/fibonacci/:number', (req, res) => { //รับพารามิเตอร์
    const number = parseInt(req.params.number);

   

    // ตรวจสอบnumber บวกหรือไม่
    if (!isNaN(number) && number > 0) {
        const result = fibonacciSequence(number);  // เรียกฟังก์ชันคำนวณลำดับ Fibonacci


        
        // ตรวจสอบการเกิด error ว่าเกิดหรือไม่
        if (result.error) {
            res.status(400).json({ "เกิด Error,": result.error }); // ส่ง error response กลับไป
        } else if (Array.isArray(result.sequence)) { // เช็คว่า sequence เป็น array หรือไม่
            const sum = SequenceForTotal(result.sequence); // คำนวณผลรวมลำดับ Fibonacci
            const fibonacciMessage = 'this is over 100';

            // ส่งผลลัพธ์ลำดับ Fibonacci และผลรวมกลับไป
            res.status(200).json({
                "fibonacci_sequence": result.sequence,
                "fibonacci_sum": sum 
            });
        } else {
            res.status(500).json({ //การเกิดError 500
                "error": "เกิดข้อผิดพลาดในการคำนวณ Fibonacci"
            });
        }
    } else {
        res.status(400).json({ //การเกิดError 400
            "error": "เกิด Error "
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); //แจ้งเตือนconsoleว่าServerกำลังทำงาน
});


