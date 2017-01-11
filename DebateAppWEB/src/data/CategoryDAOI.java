package data;

import java.util.Collection;

import entities.Category;

public interface CategoryDAOI {

	public Collection<Category> index();

	public Category show(int id);

	public Category update(int id, String todoJson);

	public Category create(String todoJson);

	public Category destroy(int id);

}
