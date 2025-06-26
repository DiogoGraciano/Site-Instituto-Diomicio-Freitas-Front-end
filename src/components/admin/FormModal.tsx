import React, { useState, useRef } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'date' | 'email' | 'password' | 'array' | 'milestones';
  required?: boolean;
  placeholder?: string;
  accept?: string;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  onSubmitJson?: (data: Record<string, any>) => Promise<void>;
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  loading?: boolean;
  useJsonSubmit?: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSubmitJson,
  title,
  fields,
  initialData = {},
  loading = false,
  useJsonSubmit = false,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string>('');
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleInputChange = (name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const getErrorMessage = (error: any): string => {
    if (error?.response?.data) {
      const data = error.response.data;
      
      if (data.message) {
        return data.message;
      }
      
      if (data.errors) {
        if (Array.isArray(data.errors)) {
          return data.errors.join(', ');
        }
        if (typeof data.errors === 'object') {
          return Object.values(data.errors).flat().join(', ');
        }
      }
      
      if (data.error) {
        return data.error;
      }
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return 'Erro interno do servidor. Tente novamente.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    setApiError('');
    
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formValues[field.name] && field.type !== 'file') {
        newErrors[field.name] = `${field.label} é obrigatório`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (useJsonSubmit && onSubmitJson) {
      const jsonData: Record<string, any> = {};
      
      fields.forEach(field => {
        if (formValues[field.name] !== undefined && formValues[field.name] !== null) {
          if (field.type === 'array' || field.type === 'milestones') {
            jsonData[field.name] = formValues[field.name];
          } else {
            jsonData[field.name] = formValues[field.name];
          }
        }
      });

      try {
        await onSubmitJson(jsonData);
        onClose();
        setFormValues({});
        setErrors({});
        setApiError('');
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        setApiError(getErrorMessage(error));
      }
    } else {
      const formData = new FormData();
      
      fields.forEach(field => {
        if (field.type === 'file') {
          const fileInput = fileInputRefs.current[field.name];
          if (fileInput?.files?.[0]) {
            formData.append(field.name, fileInput.files[0]);
          }
        } else if (field.type === 'array') {
          if (formValues[field.name] && Array.isArray(formValues[field.name])) {
            const arrayValue = formValues[field.name].filter((item: string) => item.trim() !== '');
            arrayValue.forEach((item: string) => {
              formData.append(field.name + '[]', item.trim());
            });
          }
        } else if (field.type === 'milestones') {
          if (formValues[field.name] !== undefined && formValues[field.name] !== null) {
            formData.append(field.name, JSON.stringify(formValues[field.name]));
          }
        } else if (formValues[field.name] !== undefined && formValues[field.name] !== null) {
          formData.append(field.name, formValues[field.name]);
        }
      });

      try {
        await onSubmit(formData);
        onClose();
        setFormValues({});
        setErrors({});
        setApiError('');
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        setApiError(getErrorMessage(error));
      }
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      disabled: loading,
      className: `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
        errors[field.name] ? 'border-red-500' : ''
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={formValues[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            rows={4}
          />
        );
      
      case 'file':
        return (
          <input
            {...commonProps}
            type="file"
            accept={field.accept}
            ref={(el) => {
              if (el) fileInputRefs.current[field.name] = el;
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        );
      
      case 'array':
        const arrayValue = formValues[field.name] || [''];
        return (
          <div className="space-y-2">
            {arrayValue.map((item: string, index: number) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={item}
                  onChange={(e) => {
                    const newArray = [...arrayValue];
                    newArray[index] = e.target.value;
                    handleInputChange(field.name, newArray);
                  }}
                  placeholder={`${field.placeholder || field.label} ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newArray = arrayValue.filter((_: any, i: number) => i !== index);
                    handleInputChange(field.name, newArray.length > 0 ? newArray : ['']);
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                  disabled={loading || arrayValue.length <= 1}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newArray = [...arrayValue, ''];
                handleInputChange(field.name, newArray);
              }}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              + Adicionar {field.label}
            </button>
          </div>
        );
      
      case 'milestones':
        const milestonesValue = formValues[field.name] || [{ year: '', event: '' }];
        return (
          <div className="space-y-3">
            {milestonesValue.map((milestone: { year: string; event: string }, index: number) => (
              <div key={index} className="p-3 border border-gray-200 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={milestone.year}
                    onChange={(e) => {
                      const newArray = [...milestonesValue];
                      newArray[index] = { ...newArray[index], year: e.target.value };
                      handleInputChange(field.name, newArray);
                    }}
                    placeholder="Ano"
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={milestone.event}
                    onChange={(e) => {
                      const newArray = [...milestonesValue];
                      newArray[index] = { ...newArray[index], event: e.target.value };
                      handleInputChange(field.name, newArray);
                    }}
                    placeholder="Evento/Marco"
                    className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newArray = milestonesValue.filter((_: any, i: number) => i !== index);
                    handleInputChange(field.name, newArray.length > 0 ? newArray : [{ year: '', event: '' }]);
                  }}
                  className="mt-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  disabled={loading || milestonesValue.length <= 1}
                >
                  Remover Marco
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newArray = [...milestonesValue, { year: '', event: '' }];
                handleInputChange(field.name, newArray);
              }}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              + Adicionar Marco
            </button>
          </div>
        );
      
      default:
        return (
          <input
            {...commonProps}
            type={field.type}
            value={formValues[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-md">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600">Salvando...</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Alert */}
        {apiError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erro ao salvar</h3>
                <p className="mt-1 text-sm text-red-700 whitespace-pre-line">{apiError}</p>
              </div>
              <button
                onClick={() => setApiError('')}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-600/50 flex items-center justify-center"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal; 