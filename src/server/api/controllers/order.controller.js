import { convertArrayToPagedObject, handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all orders
*/
const getOrders = async (req, res, next) => {
	try {
		// Get query parameters
		const { itemsPerPage, currentPage } = req.query;

		// Get orders from database
		let orders = null;
		if (itemsPerPage && currentPage) {
			orders = await database.Order.findAll({
				offset: (currentPage - 1) * itemsPerPage,
				limit: itemsPerPage,
			});
			orders = convertArrayToPagedObject(orders, itemsPerPage, currentPage, await database.Order.count());
		} else {
			orders = await database.Order.findAll();
		}

    

    if (!orders || orders.length === 0) {
      throw new HTTPError(`Could not found orders!`, 404);
    }

		// Send response
		res.status(200).json(orders);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific order
*/
const getOrderById = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		// Get specific order from database
		const order = await database.Order.findByPk(orderId);

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}
		// Send response
		res.status(200).json(order);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new order
*/
const createOrder = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Order.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting order
*/
const updateOrder = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		console.log(orderId);
		// Get specific order from database
		const order = await database.Order.findByPk(orderId);

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Order.update(model, {
			where: {
				id: orderId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting order
*/
const deleteOrder = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		// Get specific order from database
		const order = await database.Order.findByPk(orderId);

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}

		// Delete a order with specified id
		const message = await database.Order.destroy({
			where: {
				id: orderId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createOrder, deleteOrder, getOrderById, getOrders, updateOrder,
};
