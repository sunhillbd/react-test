"use client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ChevronRight } from "lucide-react";
import CategoryForm from "@/components/business/products/CategoryForm";
import DeleteModal from "@/components/shared/DeleteModal";
import apiService from "@/services/apiService";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState();
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryId: null,
  });

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      // API çağrısı yapılacak
      const response = await apiService.delete(`/api/v1/categories/${categoryId}`);
      toast.success(response.message);
      getAllList();
      setDeleteModal({ isOpen: false, categoryId: null });
    } catch (error) {
      toast.error("error deleting category!");

      console.error("Kategori silinirken hata:", error);
    }
  };

  const handleSubmit = async (formData) => {
    if (editingCategory) {
      const editdata = {
        id: editingCategory.id,
        ...formData,
      };
      try {
        const response = await apiService.put(
          `/api/v1/categories/${editingCategory.id}`,
          editdata
        ); // Replace with your endpoint
        toast.success(response?.message);
        getAllList();
        setShowForm(false);
      } catch (error) {
        toast.error("Error updating category");

        console.error(
          "Error saving category:",
          error.response?.data || error.message
        );
      }
    } else {
      // Yeni kategori API çağrısı
      const newCategory = {
        // id: Math.random(),
        ...formData,
      };

      try {
        const response = await apiService.post(
          "/api/v1/categories",
          newCategory
        ); // Replace with your endpoint
        toast.success(response?.message);
        getAllList();
        setShowForm(false);
      } catch (error) {
        toast.error("Error saving category");

        console.error(
          "Error saving category:",
          error.response?.data || error.message
        );
      }
    }
  };

  const getAllList = () => {
    apiService.get("/api/v1/categories").then((res) => {
      if (res.data?.data?.length) {
        setCategories(res.data);
      }
    });
  };

  useEffect(() => {
    getAllList();
  }, []);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kategoriler
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ürün kategorilerini yönetin
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary 
            rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Kategori
          </button>
        </div>

        {/* Categories List */}
        <div
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 
        dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700"
        >
          {categories?.data?.map((category) => (
            <div key={category.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {category.productCount} ürün
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-500 hover:text-gray-700 
                    dark:text-gray-400 dark:hover:text-gray-200 rounded-lg 
                    hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        categoryId: category.id,
                      })
                    }
                    className="p-2 text-red-500 hover:text-red-700 
                    dark:text-red-400 dark:hover:text-red-200 rounded-lg 
                    hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Subcategories */}
              {category.subcategories?.length > 0 && (
                <div className="mt-4 pl-4 space-y-2">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between py-2 px-4 
                      bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {sub.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({sub.productCount} ürün)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 text-gray-500 hover:text-gray-700 
                        dark:text-gray-400 dark:hover:text-gray-200 rounded-lg 
                        hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-red-500 hover:text-red-700 
                        dark:text-red-400 dark:hover:text-red-200 rounded-lg 
                        hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Category Form Modal */}
        {showForm && (
          <CategoryForm
            initialData={editingCategory}
            onClose={() => {
              setShowForm(false);
              setEditingCategory(null);
            }}
            meta={categories?.meta}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, categoryId: null })}
        onConfirm={() => handleDelete(deleteModal.categoryId)}
        title="Kategoriyi Sil"
        message="Bu kategoriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      />
    </>
  );
}
