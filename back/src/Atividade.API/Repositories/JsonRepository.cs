using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace Atividade.API.Repositories
{
    public class JsonRepository<T> where T : class
    {
        private readonly string _filePath;

        public JsonRepository(string filePath)
        {
            _filePath = filePath;

            // Verifica se o arquivo existe, e se não existir, cria um novo arquivo vazio
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]"); // Inicializa com uma lista vazia em JSON
            }
        }

        public List<T> GetAll()
        {
            var jsonData = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<T>>(jsonData) ?? new List<T>();
        }

        public void SaveAll(List<T> items)
        {
            var jsonData = JsonSerializer.Serialize(items, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, jsonData);
        }

        public void Add(T item, Func<T, int> idSelector, Action<T, int> setIdAction)
        {
            var items = GetAll();
            int newId = items.Any() ? items.Max(idSelector) + 1 : 1; // Auto incremento do ID
            setIdAction(item, newId); // Define o ID no item novo
            items.Add(item);
            SaveAll(items);
        }

        public void Update(T item, int id, Func<T, int> idSelector)
        {
            var items = GetAll();
            var index = items.FindIndex(i => idSelector(i) == id);
            if (index != -1)
            {
                items[index] = item;
                SaveAll(items);
            }
        }

        public void Delete(int id, Func<T, int> idSelector)
        {
            var items = GetAll();
            var item = items.FirstOrDefault(i => idSelector(i) == id);
            if (item != null)
            {
                items.Remove(item);
                SaveAll(items);
            }
        }
    }
}
