using ProductManagementSystem.Contracts;
using ProductManagementSystem.Entities;
using ProductManagementSystem.Entities.Helpers;
using ProductManagementSystem.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductManagementSystem.Repository
{
    public class RepositoryWrapper: IRepositoryWrapper
    {
        private RepositoryContext _repoContext;

        private IProductRepository _product;
        private ISortHelper<Product> _productSortHelper;
        private IDataShaper<Product> _productDataShaper;

        public IProductRepository Product
        {
            get
            {
                if (_product == null)
                {
                    _product = new ProductRepository(_repoContext, _productSortHelper, _productDataShaper);
                }

                return _product;
            }
        }

        public RepositoryWrapper(RepositoryContext repositoryContext, ISortHelper<Product> productSortHelper, IDataShaper<Product> productDataShaper)
        {
            _repoContext = repositoryContext;
            _productSortHelper = productSortHelper;
            _productDataShaper = productDataShaper;
        }

        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
