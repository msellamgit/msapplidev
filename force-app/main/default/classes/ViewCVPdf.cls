public class ViewCVPdf {
    public Attachment att {
        get {
            if (att == null) {
                att = [SELECT Body, ContentType, Name FROM Attachment WHERE ID = '00P2400000hpdaWEAQ'];
            }
            return att;
        }
        private set;
    }
    public String pdf {
        get {
            return EncodingUtil.Base64Encode(att.body);
        }
    }
}