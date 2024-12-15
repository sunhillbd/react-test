export const MOCK_MESSAGES = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      avatar: "/assets/avatars/avatar-1.png",
      lastMessage: "Merhaba, nasılsınız?",
      timestamp: "14:30",
      online: true,
      messages: [
        { 
          id: 1, 
          type: 'text',
          text: "Merhaba, iPhone 15 Pro hakkında bilgi almak istiyorum.", 
          sender: "user", 
          time: "14:25" 
        },
        { 
          id: 2, 
          type: 'text',
          text: "Merhaba, size nasıl yardımcı olabilirim?", 
          sender: "business", 
          time: "14:27" 
        },
        { 
          id: 3, 
          type: 'text',
          text: "Ürün hakkında bilgi verdiğiniz için teşekkürler.", 
          sender: "business", 
          time: "14:30" 
        }
      ]
    },
    {
        id: 2,
        name: "Samsung Türkiye",
        avatar: "/assets/avatars/avatar-2.png",
        lastMessage: "Merhaba, Samsung Galaxy S24 hakkında bilgi almak istiyorum.",
        timestamp: "14:30",
        online: false,
        messages: [
            { id: 1, text: "Merhaba, Samsung Galaxy S24 hakkında bilgi almak istiyorum.", sender: "user", time: "14:25" }
        ]
    },
    {
        id: 3,
        name: "Huawei Türkiye",
        avatar: "/assets/avatars/avatar-3.png",
        lastMessage: "Merhaba, Huawei P50 hakkında bilgi almak istiyorum.",
        timestamp: "14:30",
        online: false,
        messages: [
            { id: 1, text: "Merhaba, Huawei P50 hakkında bilgi almak istiyorum.", sender: "user", time: "14:25" }
        ]
    }
  ];