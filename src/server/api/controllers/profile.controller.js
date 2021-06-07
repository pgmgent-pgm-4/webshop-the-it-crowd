import { convertArrayToPagedObject, handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all profiles
*/
const getProfiles = async (req, res, next) => {
	try {
		// Get query parameters
		const { itemsPerPage, currentPage } = req.query;

		// Get profiles from database
		let profiles = null;
		if (itemsPerPage && currentPage) {
			profiles = await database.Profile.findAll({
				offset: (currentPage - 1) * itemsPerPage,
				limit: itemsPerPage,
			});
			profiles = convertArrayToPagedObject(profiles, itemsPerPage, currentPage, await database.Profile.count());
		} else {
			profiles = await database.Profile.findAll({
                include: [
                    { 
                        model: database.Payment,
                        as: 'payment'
                     },
                     {
                         model: database.Order,
                         as: "order",
                         include: [
                             {
                                 model: database.OrderProduct , 
                                 as: 'OrderProduct',
                                 include: [
                                     {
                                         model: database.Product,
                                         as: "product"
                                     }
                                 ]
                             }
                         ]
                     },
                     {
                         model: database.Review,
                         as: 'review'
                     }
                 ]
            });
		}

    

    if (!profiles || profiles.length === 0) {
      throw new HTTPError(`Could not found profiles!`, 404);
    }

		// Send response
		res.status(200).json(profiles);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile
*/
const getProfileById = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findByPk(profileId, {
            include: [
                 {
                     model: database.Order,
                     as: "order",
                     include: [
                         {
                             model: database.OrderProduct , 
                             as: 'OrderProduct',
                             include: [
                                 {
                                     model: database.Product,
                                     as: "product"
                                 }
                             ]
                         },
                         {
                             model: database.Payment,
                             as: 'payment'
                         }
                     ]
                 },
                 {
                     model: database.Review,
                     as: 'review'
                 },
                 { 
                    model: database.Payment,
                    as: 'payment'
                 },
             ]
        });

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new profile
*/
const createProfile = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Profile.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting profile
*/
const updateProfile = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		console.log(profileId);
		// Get specific profile from database
		const profile = await database.Profile.findByPk(profileId);

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Profile.update(model, {
			where: {
				id: profileId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting profile
*/
const deleteProfile = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findByPk(profileId);

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}

		// Delete a profile with specified id
		const message = await database.Profile.destroy({
			where: {
				id: profileId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createProfile, deleteProfile, getProfileById, getProfiles, updateProfile,
};

