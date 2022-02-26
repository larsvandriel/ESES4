﻿using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Contracts;
using ProductManagementSystem.Entities;
using ProductManagementSystem.Entities.Extensions;
using ProductManagementSystem.Entities.Helpers;
using ProductManagementSystem.Entities.Models;
using ProductManagementSystem.Entities.Parameters;
using ProductManagementSystem.Entities.ShapedEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductManagementSystem.Repository
{
    public class ProductRepository: RepositoryBase<Product>, IProductRepository
    {
        private readonly ISortHelper<Product> _sortHelper;

        private readonly IDataShaper<Product> _dataShaper;

        public ProductRepository(RepositoryContext repositoryContext, ISortHelper<Product> sortHelper, IDataShaper<Product> dataShaper) : base(repositoryContext)
        {
            _sortHelper = sortHelper;
            _dataShaper = dataShaper;
        }

        public void CreateProduct(Product product)
        {
            //List<Category> categories = product.Categories;
            //product.Categories = new List<Category>();

            //Brand brand = product.Brand;
            //product.Brand = null;

            product.TimeCreated = DateTime.Now;
            Create(product);

            //product.Categories = categories;
            //product.Brand = brand;
        }

        public void DeleteProduct(Product product)
        {
            product.Deleted = true;
            product.TimeDeleted = DateTime.Now;
            Product dbProduct = GetProductById(product.Id);
            UpdateProduct(dbProduct, product);
        }

        public PagedList<ShapedEntity> GetAllProducts(ProductParameters productParameters)
        {
            var products = FindByCondition(product => !product.Deleted).AsQueryable();

            SearchByName(ref products, productParameters.Name);

            var sortedProducts = _sortHelper.ApplySort(products, productParameters.OrderBy);
            var shapedProducts = _dataShaper.ShapeData(sortedProducts, productParameters.Fields).AsQueryable();

            return PagedList<ShapedEntity>.ToPagedList(shapedProducts, productParameters.PageNumber, productParameters.PageSize);
        }

        public ShapedEntity GetProductById(Guid productId, string fields)
        {
            var product = FindByCondition(product => product.Id.Equals(productId)).FirstOrDefault();

            if (product == null)
            {
                product = new Product();
            }

            return _dataShaper.ShapeData(product, fields);
        }

        public Product GetProductById(Guid productId)
        {
            return FindByCondition(product => product.Id.Equals(productId)).FirstOrDefault();
        }

        public void UpdateProduct(Product dbProduct, Product product)
        {
            dbProduct.Map(product);

            RepositoryContext.Products.Attach(dbProduct);

            Update(dbProduct);

        }

        private void SearchByName(ref IQueryable<Product> products, string productName)
        {
            if (!products.Any() || string.IsNullOrWhiteSpace(productName))
            {
                return;
            }

            products = products.Where(i => i.Name.ToLower().Contains(productName.Trim().ToLower()));
        }
    }
}
