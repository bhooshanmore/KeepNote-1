package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	private CategoryRepository categoryRepository;

	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	/*
	 * This method should be used to save a new category.Call the corresponding
	 * method of Respository interface.
	 */
	@Transactional
	public Category createCategory(Category category) throws CategoryNotCreatedException {
		category.setCategoryCreationDate(new Date());
		return Optional.ofNullable(categoryRepository.insert(category))
				.orElseThrow(() -> new CategoryNotCreatedException("Not Created"));
	}

	/*
	 * This method should be used to delete an existing category.Call the
	 * corresponding method of Respository interface.
	 */
	@Transactional
	public boolean deleteCategory(String categoryId) throws CategoryDoesNoteExistsException {
		boolean deleted = false;
		Category categoryExist = categoryRepository.findById(categoryId).orElse(null);
		if (categoryExist != null) {
			categoryRepository.delete(categoryExist);
			deleted = true;
		} else {
			throw new CategoryDoesNoteExistsException("Category Not Exist");
		}
		return deleted;
	}

	/*
	 * This method should be used to update a existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public Category updateCategory(Category category, String categoryId) {
		Category categoryExist = categoryRepository.findById(categoryId).get();
		if (categoryExist != null) {
			category.setId(categoryId);
			categoryRepository.save(category);
		}
		return category;
	}

	/*
	 * This method should be used to get a category by categoryId.Call the
	 * corresponding method of Respository interface.
	 */
	public Category getCategoryById(String categoryId) throws CategoryNotFoundException {
		Category category = null;
		try {
			category = categoryRepository.findById(categoryId).get();
		} catch (NoSuchElementException e) {
			throw new CategoryNotFoundException("Not Found");
		}
		return category;
	}

	/*
	 * This method should be used to get a category by userId.Call the corresponding
	 * method of Respository interface.
	 */
	public List<Category> getAllCategoryByUserId(String userId) {

		return categoryRepository.findAllCategoryByCategoryCreatedBy(userId);
	}

}
