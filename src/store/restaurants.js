export default {
  loading: true,
  error: null,
  restaurants: [
    {
			id: 1,
			name: 'Skyye',
			contact: '080-12334567',
			image_url: 'https://i.ytimg.com/vi/MgwG1MToEag/maxresdefault.jpg',
			location: {
				latitude: 12.9714324,
				longitude: 77.5943193
			},
			menu_list: [{
				Veg: [{
						dish_name: "pasta",
						price: 250,
						rating: 3.5
					}, {
						dish_name: "paneer tikka sandwich",
						price: 250,
						rating: 2.5
					},
					{
						dish_name: "veg cheese sandwich",
						price: 158,
						rating: 2.5
					},
					{
						dish_name: "onion spring roll",
						price: 199,
						rating: 2.5
					}
				],
				nonVeg: [{
						dish_name: "chicken spring roll",
						price: 299,
						rating: 2.5
					},
					{
						dish_name: "chicken pizza",
						price: 499,
						rating: 3.8
					},
					{
						dish_name: "turkey sandwich",
						price: 259,
						rating: 2.8
					},
					{
						dish_name: "american cheese burger",
						price: 350,
						rating: 4.0
					},
					{
						dish_name: "salmon sushi",
						price: 350,
						rating: 4.0
					}
				]
			}]
		},
  ],
};
