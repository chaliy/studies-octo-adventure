namespace SolidDip.Model
{
    using System;
    using System.ComponentModel;

    [DisplayName("Компонент")]
    public class CircuitComponent : IDataErrorInfo
    {
        [Category("Інформація")]
        [DisplayName("Назва компоненти")]
        [Description("Назва компоненти в сборці")]
        public string PartName { get; set; }

        [Category("Компонент")]
        [DisplayName("Документ")]
        [Editor(typeof(CircuitComponentDataControl), typeof(CircuitComponentDataControl))]
        public byte[] Data { get; set; }

        string IDataErrorInfo.Error
        {
            get
            {
                return null;
            }
        }

        string IDataErrorInfo.this[string columnName]
        {
            get
            {
                if (columnName == "Data")
                {
                    if (Data == null || Data.Length == 0)
                    {
                        return "Документ має бути заданим";
                    }
                }

                if (columnName == "PartName")
                {
                    if (String.IsNullOrWhiteSpace(PartName))
                    {
                        return "Введіть будь ласка назву компоненту";
                    }
                }
                return null;
            }
        }
    }

}
