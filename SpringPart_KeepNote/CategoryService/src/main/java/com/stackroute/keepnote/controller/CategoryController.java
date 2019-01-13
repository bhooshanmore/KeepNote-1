package com.stackroute.keepnote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.service.CategoryService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/v1/category")
@Api
@CrossOrigin("*")
public class CategoryController {

	private CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	/*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. Please note that the careatorId has to be unique.This handler
	 * method should return any one of the status messages basis on different
	 * situations: 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP POST
	 * method".
	 */
	@PostMapping()
	public ResponseEntity<Category> createCategory(@RequestBody Category category) {
		ResponseEntity<Category> result = null;
		try {
			Category categoryRes = categoryService.createCategory(category);
			result = new ResponseEntity<Category>(categoryRes, HttpStatus.CREATED);

		} catch (CategoryNotCreatedException e) {
			// TODO Auto-generated catch block
			result = new ResponseEntity<Category>(HttpStatus.CONFLICT);
		}
		return result;
	}

	/*
	 * Define a handler method which will delete a category from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
	 * not found.
	 * 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid categoryId without {}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteCategory(@PathVariable("id") String categoryId) {
		ResponseEntity<Boolean> result = null;
		try {
			boolean deleted = categoryService.deleteCategory(categoryId);
			if (deleted) {
				result = new ResponseEntity<Boolean>(deleted,HttpStatus.OK);
			}
		} catch (CategoryDoesNoteExistsException e) {
			// TODO Auto-generated catch block
			result = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return result;
	}

	/*
	 * Define a handler method which will update a specific category by reading the
	 * Serialized object from request body and save the updated category details in
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the category updated
	 * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
	 * is not found. This handler method should map to the URL
	 * "/api/v1/category/{id}" using HTTP PUT method.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<Category> updateCategory(@RequestBody Category category,
			@PathVariable("id") String categoryId) {
		ResponseEntity<Category> result = null;
		if (categoryService.updateCategory(category, categoryId) != null) {
			result = new ResponseEntity<Category>(HttpStatus.OK);
		} else {
			result = new ResponseEntity<Category>(HttpStatus.CONFLICT);
		}
		return result;
	}

	/*
	 * Define a handler method which will get us the category by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category found successfully.
	 * 
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP GET
	 * method
	 */
	
	@GetMapping
	public ResponseEntity<List<Category>> getAllCategoryByUserId(@RequestParam String userId){
		return new ResponseEntity<List<Category>>(categoryService.getAllCategoryByUserId(userId),HttpStatus.OK);
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
		ResponseEntity<Category> result = null;
		try {
			Category category = categoryService.getCategoryById(id);
			if (category != null) {
				result = new ResponseEntity<Category>(category,HttpStatus.OK);
			}
		} catch (CategoryNotFoundException e) {
			result = new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

}
